frappe.listview_settings['Item'] = {
	add_fields: ["item_name", "stock_uom", "item_group", "image", "variant_of",
<<<<<<< HEAD
		"has_variants", "end_of_life", "is_sales_item"],

	get_indicator: function(doc) {
		if(doc.end_of_life && doc.end_of_life < frappe.datetime.get_today()) {
			return [__("Expired"), "grey", "end_of_life,<,Today"]
		} else if(doc.has_variants) {
			return [__("Template"), "blue", "has_variants,=,Yes"]
		} else if(doc.variant_of) {
			return [__("Variant"), "green", "variant_of,=," + doc.variant_of]
		} else {
			return [__("Active"), "blue", "end_of_life,>=,Today"]
=======
		"has_variants", "end_of_life", "disabled", "is_sales_item"],

	get_indicator: function(doc) {
		if (doc.disabled) {
			return [__("Disabled"), "grey", "disabled,=,Yes"];
		} else if (doc.end_of_life && doc.end_of_life < frappe.datetime.get_today()) {
			return [__("Expired"), "grey", "end_of_life,<,Today"];
		} else if (doc.has_variants) {
			return [__("Template"), "blue", "has_variants,=,Yes"];
		} else if (doc.variant_of) {
			return [__("Variant"), "green", "variant_of,=," + doc.variant_of];
		} else {
			return [__("Active"), "blue", "end_of_life,>=,Today"];
>>>>>>> ca4c663e073bba1971aa1e9ad76ce6f000eae2a0
		}
	}
};

frappe.help.youtube_id["Item"] = "qXaEwld4_Ps";
