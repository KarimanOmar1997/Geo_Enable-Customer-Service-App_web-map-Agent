// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../core/reactiveUtils ../../core/accessorSupport/decorators/property ../../core/accessorSupport/ensureType ../../core/arrayUtils ../../core/has ../../core/accessorSupport/decorators/subclass ../../layers/support/layerUtils ../../views/draw/support/helpMessageUtils ./CreateWorkflowData ./Edits ./Workflow ./workflowUtils".split(" "),function(n,w,q,h,D,E,x,v,y,z,A,B,d){var r;h=r=class extends B{constructor(b){super(b);this.type="create"}get shouldShowAttachments(){return this.data?.creationInfo&&
this.data.viewModel?d.shouldShowAttachmentsForCreateWorkflow(this.data):!1}get shouldAllowAttachmentEditing(){return this.shouldShowAttachments}get hasPendingEdits(){return!0}get helpMessage(){if("editing-new-feature"===this.stepId){var {creationInfo:b,viewModel:e}=this.data,a=b.layer.geometryType;if("mesh"!==a)return y.getDrawHelpMessage(a,e.sketchViewModel.createGraphic?.geometry)}}get reliesOnOwnerAdminPrivileges(){const {layer:b}=this.data.creationInfo,e=b.capabilities?.operations.supportsAdd,
a=v.getEffectiveLayerCapabilities(b)?.operations.supportsAdd;return v.getEffectiveEditingEnabled(b)&&!b.editingEnabled||!!a&&!e}static create(b,e,a){b=new r({data:new z({edits:new A.Edits,viewModel:b}),onCommit:async k=>{await a(k.creationInfo.layer,{addFeatures:[k.edits.feature]})}});b._set("steps",this._createWorkflowSteps(b,e));return b}static _createWorkflowSteps(b,e="awaiting-feature-creation-info"){const {data:a}=b,k=new Map;e=d.createWorkflowSteps(["awaiting-feature-creation-info","awaiting-feature-to-create",
"editing-new-feature","adding-attachment","editing-attachment"],e,{"awaiting-feature-creation-info":()=>({id:"awaiting-feature-creation-info",async setUp(){a.creationInfo=null;a.edits.feature=null;a.viewModel.featureTemplatesViewModel.select(null);b.addHandles(a.viewModel.featureTemplatesViewModel.on("select",({item:c})=>{c&&(a.creationInfo=c,a.viewModel.activeWorkflow?.next())}),this.id)},async tearDown(){b.removeHandles(this.id)}}),"awaiting-feature-to-create":()=>({id:"awaiting-feature-to-create",
async setUp(){b.addHandles(await d.setUpFeatureAdd(a.viewModel.sketchViewModel,a.creationInfo,c=>{a.edits.feature=c;a.viewModel.activeWorkflow?.next()},k),this.id)},async tearDown(){b.removeHandles(this.id)}}),"editing-new-feature":()=>({id:"editing-new-feature",async setUp(){const c=a.edits.feature,t=c.sourceLayer,l=a.viewModel,p=l.sketchViewModel;var u=d.findLayerInfo(l.layerInfos,t);const {spatialReference:C}=l.view;l.featureFormViewModel.set({arcadeEditType:"INSERT",feature:c,formTemplate:u?.formTemplate,
spatialReference:C});p.allowDeleteKey=!1;d.prepareAttachmentsForCreateWorkflow(l.attachmentsViewModel);const m=d.getVisualVariableAttributes(c);await d.startUpdatingFeature({graphic:c,sketchViewModel:p,sourceLayer:t,visualVariables:m,webStyleCache:k});u=p.on("update",async f=>{var g=f.graphics[0];if("complete"===f.state)return d.startUpdatingFeature({graphic:g,sketchViewModel:p,sourceLayer:t,visualVariables:m,webStyleCache:k});await d.visualVariableInteractiveUpdate(p.view,g,f,m,k);f=g.attributes;
null!=m.rotation&&({field:g}=m.rotation,l.featureFormViewModel.setValue(g,f[g]));null!=m.size&&({field:g}=m.size,l.featureFormViewModel.setValue(g,f[g]))});b.addHandles([a.viewModel.featureFormViewModel.on("value-change",async()=>{a.edits.updateAttributes(a.viewModel.featureFormViewModel.getValues());c.attributes=a.edits.feature.attributes;"3d"===p.view.type&&await d.updateGraphicSymbolWhenRequired(c,k)}),u,w.watch(()=>a.viewModel.attachmentsViewModel.mode,f=>{"add"===f&&a.viewModel.activeWorkflow.go("adding-attachment");
"edit"===f&&a.viewModel.activeWorkflow.go("editing-attachment")})],this.id)},async tearDown(c){c.canceled&&a.viewModel.sketchViewModel.layer.removeAll();b.removeHandles(this.id)}}),"adding-attachment":()=>({id:"adding-attachment",parent:"editing-new-feature",async setUp(){},async tearDown(){a.viewModel.attachmentsViewModel.mode="view"}}),"editing-attachment":()=>({id:"editing-attachment",parent:"editing-new-feature",async setUp(){},async tearDown(){a.viewModel.attachmentsViewModel.mode="view"}})});
return d.avoidFeatureTemplateSelectionWithOnlyOneItem(a,e)}};n.__decorate([q.property()],h.prototype,"shouldShowAttachments",null);n.__decorate([q.property()],h.prototype,"shouldAllowAttachmentEditing",null);n.__decorate([q.property()],h.prototype,"hasPendingEdits",null);n.__decorate([q.property()],h.prototype,"helpMessage",null);n.__decorate([q.property()],h.prototype,"reliesOnOwnerAdminPrivileges",null);return h=r=n.__decorate([x.subclass("esri.widgets.Editor.CreateWorkflow")],h)});