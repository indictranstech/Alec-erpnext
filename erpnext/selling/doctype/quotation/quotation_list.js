frappe.listview_settings['Quotation'] = {
	add_fields: ["customer_name", "base_grand_total", "status",
		"company", "currency"],
	get_indicator: function(doc) {
		if(doc.status==="Submitted") {
			return [__("Submitted"), "blue", "status,=,Submitted"];
		} else if(doc.status==="Ordered") {
			return [__("Ordered"), "green", "status,=,Ordered"];
		} else if(doc.status==="Lost") {
			return [__("Lost"), "darkgrey", "status,=,Lost"];
		}
	},
	refresh: function(me) {
		// add my documents
		me.page.add_sidebar_item(__("My Documents"), function() {
			var assign_filter = me.filter_list.get_filter("owner");
			assign_filter && assign_filter.remove(true);

			me.filter_list.add_filter(me.doctype, "owner", '=', user);
			me.run();
		}, ".assigned-to-me");
	}
};
