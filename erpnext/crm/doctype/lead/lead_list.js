frappe.listview_settings['Lead'] = {
	refresh: function(me) {
		// add my documents
		me.page.add_sidebar_item(__("My Documents"), function() {
			var assign_filter = me.filter_list.get_filter("owner");
			assign_filter && assign_filter.remove(true);

			me.filter_list.add_filter(me.doctype, "lead_owner", '=', user);
			me.run();
		}, ".assigned-to-me");
	},
}
