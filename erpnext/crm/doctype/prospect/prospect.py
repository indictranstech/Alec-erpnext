# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import cstr, validate_email_add, cint, comma_and
from frappe import session
from frappe.model.mapper import get_mapped_doc

from erpnext.controllers.selling_controller import SellingController
from erpnext.utilities.address_and_contact import load_address_and_contact

sender_field = "email_id"

class Prospect(SellingController):
	def get_feed(self):
		return '{0}: {1}'.format(_(self.status), self.prospect_name)

	def onload(self):
		pass

	def validate(self):
		self._prev = frappe._dict({
			"contact_date": frappe.db.get_value("Lead", self.name, "contact_date") if \
				(not cint(self.get("__islocal"))) else None,
			"contact_by": frappe.db.get_value("Lead", self.name, "contact_by") if \
				(not cint(self.get("__islocal"))) else None,
		})

		self.set_status()
		self.check_email_id_is_unique()

		if self.source == 'Campaign' and not self.campaign_name and session['user'] != 'Guest':
			frappe.throw(_("Campaign Name is required"))

		if self.email_id:
			validate_email_add(self.email_id, True)

			if self.email_id == self.prospect_owner:
				# Lead Owner cannot be same as the Lead
				self.lead_owner = None

	def on_update(self):
		self.add_calendar_event()

	def add_calendar_event(self, opts=None, force=False):
		pass

	def check_email_id_is_unique(self):
		if self.email_id:
			# validate email is unique
			duplicate_leads = frappe.db.sql_list("""select name from tabProspect 
				where email_id=%s and name!=%s""", (self.email_id, self.name))

			if duplicate_leads:
				frappe.throw(_("Email id must be unique, already exists for {0}")
					.format(comma_and(duplicate_leads)), frappe.DuplicateEntryError)

	def on_trash(self):
		frappe.db.sql("""update `tabIssue` set lead='' where lead=%s""",
			self.name)

		self.delete_events()

	def has_lead(self):
		return frappe.db.get_value("Lead", {"prospect_name": self.name})

@frappe.whitelist()
def make_lead(source_name, target_doc=None):
	return _make_lead(source_name, target_doc)

def _make_lead(source_name, target_doc=None, ignore_permissions=False):
	def set_missing_values(source, target):
		target.lead_name = source.prospect_name
		target.source = source.prospect_owner
		target.company_name = source.company_name
		target.contact_no = source.phone
		target.type = source.prospect_type
		target.lead_owner = source.prospect_owner
	doclist = get_mapped_doc("Prospect", source_name,
			{"Prospect": {
				"doctype": "Lead",
				"field_map": {
					"lead_name": "prospect_name",
					}
			}}, target_doc, set_missing_values, ignore_permissions=ignore_permissions)
	
	return doclist
