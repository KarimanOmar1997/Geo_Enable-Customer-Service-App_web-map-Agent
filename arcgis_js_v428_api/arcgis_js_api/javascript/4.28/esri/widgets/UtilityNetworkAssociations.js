// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("require ../chunks/tslib.es6 ../core/reactiveUtils ../core/accessorSupport/decorators/property ../core/accessorSupport/ensureType ../core/arrayUtils ../core/has ../core/accessorSupport/decorators/subclass ./Widget ./support/componentsUtils ./support/widgetUtils ./support/decorators/messageBundle ./support/jsxFactory ./UtilityNetworkAssociations/UtilityNetworkAssociationsLineSymbolPicker ./UtilityNetworkAssociations/UtilityNetworkAssociationsViewModel ./UtilityNetworkAssociations/VisibleElements".split(" "),
function(h,e,q,f,d,v,w,r,t,u,x,l,c,m,n,p){d=class extends t{constructor(a,b){super(a,b);this._autoRefreshAssociations=!0;this._associationsOptionsEnabled=!1;this._maxAllowableAssociationsSliderMax=1E3;this._maxAllowableAssociationsSliderStep=this._maxAllowableAssociationsSliderMin=250;this.messagesCommon=this.messages=null;this.viewModel=new n;this.visibleElements=new p}initialize(){this.addHandles([q.watch(()=>[this.view?.stationary,this.showAssociationsEnabled,this.includeConnectivityAssociations,
this.includeStructuralAttachmentAssociations,this.maxAllowableAssociations],()=>{!0===this.autoRefreshAssociations&&(!0===this.showAssociationsEnabled?this.viewModel.showAssociations():this.viewModel.removeAssociations())})])}get autoRefreshAssociations(){return this._autoRefreshAssociations}set autoRefreshAssociations(a){this._autoRefreshAssociations=a}get connectivityAssociationsLineSymbol(){return this.viewModel.connectivityAssociationsLineSymbol}set connectivityAssociationsLineSymbol(a){this.viewModel.connectivityAssociationsLineSymbol=
a}get includeConnectivityAssociations(){return this.viewModel.includeConnectivityAssociations}set includeConnectivityAssociations(a){this.viewModel.includeConnectivityAssociations=a}get includeStructuralAttachmentAssociations(){return this.viewModel.includeStructuralAttachmentAssociations}set includeStructuralAttachmentAssociations(a){this.viewModel.includeStructuralAttachmentAssociations=a}get label(){return this.messages?.widgetLabel??""}set label(a){this._overrideIfSome("label",a)}get maxAllowableAssociations(){return this.viewModel.maxAllowableAssociations}set maxAllowableAssociations(a){this.viewModel.maxAllowableAssociations=
a}get maxAllowableAssociationsSliderMax(){return this._maxAllowableAssociationsSliderMax}set maxAllowableAssociationsSliderMax(a){a<=this.maxAllowableAssociationsSliderMin||(this._maxAllowableAssociationsSliderMax=a)}get maxAllowableAssociationsSliderMin(){return this._maxAllowableAssociationsSliderMin}set maxAllowableAssociationsSliderMin(a){0>a||a>=this.maxAllowableAssociationsSliderMax||(this._maxAllowableAssociationsSliderMin=a)}get maxAllowableAssociationsSliderStep(){return this._maxAllowableAssociationsSliderStep}set maxAllowableAssociationsSliderStep(a){this._maxAllowableAssociationsSliderStep=
a}get showArrowsConnectivity(){return this.viewModel.showArrowsConnectivity}set showArrowsConnectivity(a){this.viewModel.showArrowsConnectivity=a}get showArrowsStructuralAttachment(){return this.viewModel.showArrowsStructuralAttachment}set showArrowsStructuralAttachment(a){this.viewModel.showArrowsStructuralAttachment=a}get showAssociationsEnabled(){return this.viewModel.showAssociationsEnabled}set showAssociationsEnabled(a){this.viewModel.showAssociationsEnabled=a}get structuralAttachmentAssociationsLineSymbol(){return this.viewModel.structuralAttachmentAssociationsLineSymbol}set structuralAttachmentAssociationsLineSymbol(a){this.viewModel.structuralAttachmentAssociationsLineSymbol=
a}get utilityNetwork(){return this.viewModel.utilityNetwork}set utilityNetwork(a){this.viewModel.utilityNetwork=a}get view(){return this.viewModel.view}set view(a){this.viewModel.view=a}render(){const {label:a}=this;return c.tsx("div",{class:"esri-un-associations__widget-container"},c.tsx("calcite-block",{class:"esri-un-associations__block-content",collapsible:!0,heading:a},this._renderStatusIcon(),this.autoRefreshAssociations?this._renderShowAssociationsSwitch():this._renderRefreshAssociationsAction(),
this._renderContent()))}loadDependencies(){return u.loadCalciteComponents({action:()=>new Promise((a,b)=>h(["../chunks/calcite-action"],a,b)),block:()=>new Promise((a,b)=>h(["../chunks/calcite-block"],a,b)),"block-section":()=>new Promise((a,b)=>h(["../chunks/calcite-block-section"],a,b)),icon:()=>new Promise((a,b)=>h(["../chunks/calcite-icon"],a,b)),label:()=>new Promise((a,b)=>h(["../chunks/calcite-label"],a,b)),notice:()=>new Promise((a,b)=>h(["../chunks/calcite-notice"],a,b)),panel:()=>new Promise((a,
b)=>h(["../chunks/calcite-panel"],a,b)),slider:()=>new Promise((a,b)=>h(["../chunks/calcite-slider"],a,b)),switch:()=>new Promise((a,b)=>h(["../chunks/calcite-switch"],a,b)),tooltip:()=>new Promise((a,b)=>h(["../chunks/calcite-tooltip"],a,b))})}_connectivityAssociationsSwitchChange(a){this.includeConnectivityAssociations=a.target.checked}_getLoadErrorMessagesAsNotices(a,b){return c.tsx("calcite-notice",{closable:!1,key:`error-notice-${b}`,kind:"warning",open:!0,scale:"s"},c.tsx("div",{slot:"message"},
a))}_maxAllowableAssociationsSliderChange(a){this.maxAllowableAssociations=Number(a.target.value)}_refreshAssociations(){const {viewModel:a,viewModel:{state:b}}=this;"ready"!==b&&"warning"!==b||a.showAssociations()}_renderConnectivityAsssociationsSettings(){const {messages:{input:{enableConnectivity:a}},visibleElements:{connectivityAssociationsSettings:b}}=this;if(b)return c.tsx("calcite-block-section",{class:"esri-un-associations__block-section-settings",text:a},c.tsx(m,{id:`${this.id}-symbol-picker-connectivity`,
lineSymbol:this.connectivityAssociationsLineSymbol,showArrows:this.showArrowsConnectivity,visibleElements:b}))}_renderConnectivityAssociationsToggle(){const {messages:{input:{enableConnectivity:a}}}=this;return c.tsx("div",{class:"esri-un-associations__label-and-toggle",key:"connectivityAssociationsToggleDiv"},c.tsx("calcite-label",{class:"esri-un-associations__label"},a),c.tsx("calcite-switch",{bind:this,checked:this.includeConnectivityAssociations,disabled:!this._associationsOptionsEnabled&&this.autoRefreshAssociations,
onCalciteSwitchChange:this._connectivityAssociationsSwitchChange}))}_renderContent(){const {viewModel:{loadErrors:a,state:b}}=this;return"disabled"===b?c.tsx("div",{class:"esri-un-associations__div-controls-main",key:"loadErrorsDiv"},a.items.map(this._getLoadErrorMessagesAsNotices)):c.tsx("calcite-panel",{disabled:"loading"===b},c.tsx("div",{class:"esri-un-associations__div-controls-main"},this._renderConnectivityAssociationsToggle(),this._renderStructuralAttachmentAssociationsToggle(),this._renderSettingsPane()))}_renderLoadingAction(a,
b,g){return c.tsx("div",{key:a,slot:"control"},c.tsx("calcite-action",{id:b,loading:!0,text:g}),c.tsx("calcite-tooltip",{referenceElement:b},c.tsx("span",null,g)))}_renderMaxAllowableAssociationsSlider(){const {messages:{input:{maxAllowableAssociations:a}},visibleElements:{maxAllowableAssociationsSlider:b}}=this;if(b)return c.tsx("div",{class:"esri-un-associations__label-and-slider"},c.tsx("calcite-label",{class:"esri-un-associations__label"},a),c.tsx("calcite-slider",{bind:this,class:"esri-un-associations__slider",
labelTicks:!0,max:this.maxAllowableAssociationsSliderMax,min:this.maxAllowableAssociationsSliderMin,scale:"s",snap:!0,step:this.maxAllowableAssociationsSliderStep,ticks:this.maxAllowableAssociationsSliderStep,value:this.maxAllowableAssociations,onCalciteSliderChange:this._maxAllowableAssociationsSliderChange}))}_renderRefreshAssociationsAction(){const {messages:{input:{refreshAssociations:a}},messagesCommon:{loading:b},viewModel:{state:g}}=this,k=`${this.id}-refresh-action`;if("disabled"!==g)return c.tsx("div",
{class:"esri-un-associations__action-refresh",slot:"control"},c.tsx("calcite-action",{bind:this,class:"esri-un-associations__action",icon:"refresh-",id:k,loading:"loading"===g,onclick:this._refreshAssociations,text:a}),c.tsx("calcite-tooltip",{referenceElement:k},c.tsx("span",null,"loading"===g?b:a)))}_renderSettingsPane(){const {messagesCommon:{settings:a},visibleElements:{maxAllowableAssociationsSlider:b,connectivityAssociationsSettings:g,structuralAttachmentAssociationsSettings:k}}=this;if(b||
g||k)return c.tsx("calcite-block",{class:"esri-un-associations__block-content",collapsible:!0,heading:a},this._renderMaxAllowableAssociationsSlider(),this._renderConnectivityAsssociationsSettings(),this._renderStructuralAttachmentAsssociationsSettings())}_renderShowAssociationsSwitch(){const {messages:{input:{enableAssociations:a}},messagesCommon:{loading:b},viewModel:{state:g}}=this,k=`${this.id}-show-associations-switch`;if("disabled"!==g)return"loading"===g?this._renderLoadingAction("loadingActionDiv",
`${this.id}-loading-action`,b):c.tsx("div",{class:"esri-un-associations__switch-container",key:"switchDiv",slot:"control"},c.tsx("calcite-switch",{bind:this,checked:this.showAssociationsEnabled,class:"esri-un-associations__switch",id:k,onCalciteSwitchChange:this._showAssociationsSwitchChange}),c.tsx("calcite-tooltip",{referenceElement:k},c.tsx("span",null,a)))}_renderStatusIcon(){const {messagesCommon:{executing:a},viewModel:{executionError:b,state:g}}=this;switch(g){case "disabled":return this._renderWarningIcon("statusDiv",
`${this.id}-disabled-icon`,null);case "warning":return this._renderWarningIcon("statusDiv",`${this.id}-warning-icon`,b);case "executing":return this._renderLoadingAction("executingActionDiv",`${this.id}-executing-action`,a)}}_renderStructuralAttachmentAsssociationsSettings(){const {messages:{input:{enableStructuralAttachment:a}},visibleElements:{structuralAttachmentAssociationsSettings:b}}=this;if(b)return c.tsx("calcite-block-section",{class:"esri-un-associations__block-section-settings",text:a},
c.tsx(m,{id:`${this.id}-symbol-picker-structural-attachment`,lineSymbol:this.structuralAttachmentAssociationsLineSymbol,showArrows:this.showArrowsStructuralAttachment,visibleElements:b}))}_renderStructuralAttachmentAssociationsToggle(){const {messages:{input:{enableStructuralAttachment:a}}}=this;return c.tsx("div",{class:"esri-un-associations__label-and-toggle",key:"structuralAttachmentAssociationsToggleDiv"},c.tsx("calcite-label",{class:"esri-un-associations__label"},a),c.tsx("calcite-switch",{bind:this,
checked:this.includeStructuralAttachmentAssociations,disabled:!this._associationsOptionsEnabled&&this.autoRefreshAssociations,onCalciteSwitchChange:this._structuralAttAssociationsSwitchChange}))}_showAssociationsSwitchChange(a){const {viewModel:b}=this;(this._associationsOptionsEnabled=this.showAssociationsEnabled=a.target.checked)||b.removeAssociations()}_structuralAttAssociationsSwitchChange(a){this.includeStructuralAttachmentAssociations=a.target.checked}_renderWarningIcon(a,b,g){return g?c.tsx("div",
{class:"esri-un-associations__status-icon-container",key:a,slot:"control"},c.tsx("calcite-icon",{class:"esri-un-associations__status-icon-warning",icon:"exclamation-mark-triangle",id:b,scale:"s"}),c.tsx("calcite-tooltip",{referenceElement:b},c.tsx("span",null,g))):c.tsx("div",{class:"esri-un-associations__status-icon-container",key:a,slot:"control"},c.tsx("calcite-icon",{class:"esri-un-associations__status-icon-warning",icon:"exclamation-mark-triangle",id:b,scale:"s"}))}};e.__decorate([f.property()],
d.prototype,"autoRefreshAssociations",null);e.__decorate([f.property()],d.prototype,"connectivityAssociationsLineSymbol",null);e.__decorate([f.property()],d.prototype,"includeConnectivityAssociations",null);e.__decorate([f.property()],d.prototype,"includeStructuralAttachmentAssociations",null);e.__decorate([f.property()],d.prototype,"label",null);e.__decorate([f.property()],d.prototype,"maxAllowableAssociations",null);e.__decorate([f.property()],d.prototype,"maxAllowableAssociationsSliderMax",null);
e.__decorate([f.property()],d.prototype,"maxAllowableAssociationsSliderMin",null);e.__decorate([f.property()],d.prototype,"maxAllowableAssociationsSliderStep",null);e.__decorate([f.property(),l.messageBundle("esri/widgets/UtilityNetworkAssociations/t9n/UtilityNetworkAssociations")],d.prototype,"messages",void 0);e.__decorate([f.property(),l.messageBundle("esri/t9n/common")],d.prototype,"messagesCommon",void 0);e.__decorate([f.property()],d.prototype,"showArrowsConnectivity",null);e.__decorate([f.property()],
d.prototype,"showArrowsStructuralAttachment",null);e.__decorate([f.property()],d.prototype,"showAssociationsEnabled",null);e.__decorate([f.property()],d.prototype,"structuralAttachmentAssociationsLineSymbol",null);e.__decorate([f.property()],d.prototype,"utilityNetwork",null);e.__decorate([f.property()],d.prototype,"view",null);e.__decorate([f.property({type:n})],d.prototype,"viewModel",void 0);e.__decorate([f.property({type:p,nonNullable:!0})],d.prototype,"visibleElements",void 0);return d=e.__decorate([r.subclass("esri.widgets.UtilityNetworkAssociations")],
d)});