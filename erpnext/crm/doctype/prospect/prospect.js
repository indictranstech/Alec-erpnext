// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext");
cur_frm.email_field = "email_id";

erpnext.ProspectController = frappe.ui.form.Controller.extend({

	refresh: function() {
		var doc = this.frm.doc;
		erpnext.toggle_naming_series();

		if(!this.frm.doc.__islocal && this.frm.doc.__onload && !this.frm.doc.__onload.is_lead) {
			this.frm.add_custom_button(__("Log Communication"), this.log_communication,
				frappe.boot.doctype_icons["Communication"], "btn-big");
			this.frm.add_custom_button(__("Convert to Lead"), this.create_lead,
				frappe.boot.doctype_icons["Lead"], "btn-big");
		}
	},

	create_lead: function() {
		frappe.model.open_mapped_doc({
			method: "erpnext.crm.doctype.prospect.prospect.make_lead",
			frm: cur_frm
		})
	},

	log_communication: function(){
		frappe.prompt([
				{'default': get_today(),'fieldname': 'communication_date', 'fieldtype': 'Date', 'label': 'Date', 'reqd': 1},
    			{'default': cur_frm.doc.prospect_owner, 'fieldname': 'sender','fieldtype': 'Link', 'label': 'Sender', 'options': 'User', 'reqd': 1},
    			{'default': cur_frm.doc.prospect_name, 'fieldname': 'recipient', 'fieldtype': 'Link', 'label': 'Recipients', 'options': 'User', 'reqd': 1},
    			{'fieldname': "cb01","fieldtype": "Column Break"},
    			{'default': 'Sent', 'fieldname': 'sent_or_received','fieldtype': 'Select','label': 'Sent or Received', 'options': 'Sent\nReceived'},
    			{'default': 'Open', 'fieldname': 'status', 'fieldtype': 'Select', 'label': 'Status', 'options': 'Open\nReplied\nClosed\nLinked'},
    			{'default': cur_frm.doc.prospect_owner, 'fieldname': 'sender','fieldtype': 'Link', 'label': 'Sender', 'options': 'User', 'reqd': 1},
  				{'fieldname': 'sectionbreak', 'fieldtype': 'Section Break'},
  				{'fieldname': 'subject', 'fieldtype': 'Data', 'label': 'Subject'},
  				{'fieldname': 'content', 'fieldtype': 'Small Text', 'label': 'Content'}
  			],
			function(data){
				var icecube = data.recipient;
				msgprint("Added Communication to " + icecube);
				}
			);
	}
});

$.extend(cur_frm.cscript, new erpnext.ProspectController({frm: cur_frm}));



