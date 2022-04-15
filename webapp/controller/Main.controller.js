sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("com.itsgroup.exOdata.controller.Main", {
		onInit () {
			//acessar a url primeiro no navegador para liberar o acesso sem o cors
			sap.ui.core.BusyIndicator.show();
			const url = 'https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc';
			const model = new sap.ui.model.odata.v2.ODataModel(url);
			const ctrl = this;
			
			model.read('/Products',{
				success: (data) =>{
					ctrl.populateTable(data.results)
				},
				error: (error) => {
				}
			})
		},
		populateTable(data){
			const model = new sap.ui.model.json.JSONModel();
			model.setData(data);
			this.getView().setModel(model, "ProductsModel");
			sap.ui.core.BusyIndicator.hide();
		}
	});
});