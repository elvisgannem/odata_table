sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("com.itsgroup.exOdata.controller.Main", {
		onInit () {
			//acessar a url primeiro no navegador para liberar o acesso sem o cors
			sap.ui.core.BusyIndicator.show();
			const url = 'https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc';
			const model = new sap.ui.model.odata.v2.ODataModel(url);
			const ctrl = this;

			model.read('/Products',{
				urlParameters: {
					"$expand": "Category"
				},
				success: (data) =>{
					ctrl.populateTable(data.results)
				},
				error: (error) => {
				}
			})
		},

		onFilterProducts: function(oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query"); //Parametro de busca
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			var oTable = this.byId("table");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		},

		openDialog: function(oEvent) {
			const dialog = new sap.m.Dialog({
				title: "Dados de Fornecedor",
				contentWidth: "400px",
				contentHeight: "200px",
				resizable: false,
				endButton: new sap.m.Button({
					text: "Ok",
					press: function(){
						dialog.close();
						return false;
					}
				}),
			});

			this.getView().addDependent(dialog);
			dialog.open();
		},

		populateTable(data){
			const model = new sap.ui.model.json.JSONModel();
			model.setData(data);
			this.getView().setModel(model, "ProductsModel");
			sap.ui.core.BusyIndicator.hide();
		}
	});
});