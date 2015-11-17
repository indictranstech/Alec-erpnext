// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext");
cur_frm.email_field = "email_id";

erpnext.ProspectController = frappe.ui.form.Controller.extend({

	refresh: function() {
		var doc = this.frm.doc;
		erpnext.toggle_naming_series();

		if(!this.frm.doc.__islocal && this.frm.doc.__onload && !this.frm.doc.__onload.is_lead) {
			this.frm.add_custom_button(__("Convert to Lead"), this.create_lead,
				frappe.boot.doctype_icons["Lead"], "btn-big");
		}else if(this.frm.doc.status != 'Qualified'){
			cur_frm.set_value('status', 'Qualified')
			cur_frm.save()
		}
	},

	create_lead: function(doc, cdt, cdn) {
			frappe.model.open_mapped_doc({
			method: "erpnext.crm.doctype.prospect.prospect.make_lead",
			frm: cur_frm
		})
		cur_frm.refresh()
	}
});

$.extend(cur_frm.cscript, new erpnext.ProspectController({frm: cur_frm}));



