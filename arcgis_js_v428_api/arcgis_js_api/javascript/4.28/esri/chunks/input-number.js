// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.28/esri/copyright.txt for details.
//>>built
define("exports ./index ./dom ./form ./interactive ./key ./label2 ./loadable ./locale ./observers ./t9n ./icon ./progress".split(" "),function(u,d,k,n,q,x,r,t,e,y,p,z,A){function v(){"undefined"!==typeof customElements&&["calcite-input-number","calcite-icon","calcite-progress"].forEach(a=>{switch(a){case "calcite-input-number":customElements.get(a)||customElements.define(a,w);break;case "calcite-icon":customElements.get(a)||z.defineCustomElement();break;case "calcite-progress":customElements.get(a)||
A.defineCustomElement()}})}const w=d.proxyCustomElement(class extends d.H{constructor(){super();this.__registerHost();this.__attachShadow();this.calciteInternalInputNumberFocus=d.createEvent(this,"calciteInternalInputNumberFocus",6);this.calciteInternalInputNumberBlur=d.createEvent(this,"calciteInternalInputNumberBlur",6);this.calciteInputNumberInput=d.createEvent(this,"calciteInputNumberInput",7);this.calciteInputNumberChange=d.createEvent(this,"calciteInputNumberChange",6);this.previousValueOrigin=
"initial";this.mutationObserver=y.createObserver("mutation",()=>this.setDisabledAction());this.userChangedValue=!1;this.keyDownHandler=a=>{this.readOnly||this.disabled||(this.isClearable&&"Escape"===a.key&&(this.clearInputValue(a),a.preventDefault()),"Enter"!==a.key||a.defaultPrevented||n.submitForm(this)&&a.preventDefault())};this.clearInputValue=a=>{this.setNumberValue({committing:!0,nativeEvent:a,origin:"user",value:""})};this.emitChangeIfUserModified=()=>{"user"===this.previousValueOrigin&&this.value!==
this.previousEmittedNumberValue&&(this.calciteInputNumberChange.emit(),this.setPreviousEmittedNumberValue(this.value))};this.inputNumberBlurHandler=()=>{this.calciteInternalInputNumberBlur.emit();this.emitChangeIfUserModified()};this.clickHandler=a=>{if(!this.disabled){var b=k.getSlotted(this.el,"action");a.target!==b&&this.setFocus()}};this.inputNumberFocusHandler=()=>{this.calciteInternalInputNumberFocus.emit()};this.inputNumberInputHandler=a=>{if(!this.disabled&&!this.readOnly){var b=a.target.value;
e.numberStringFormatter.numberFormatOptions={locale:this.effectiveLocale,numberingSystem:this.numberingSystem,useGrouping:this.groupSeparator};b=e.numberStringFormatter.delocalize(b);"insertFromPaste"===a.inputType?((!e.isValidNumber(b)||this.integer&&(b.includes("e")||b.includes(".")))&&a.preventDefault(),this.setNumberValue({nativeEvent:a,origin:"user",value:e.parseNumberString(b)}),this.childNumberEl.value=this.localizedValue):this.setNumberValue({nativeEvent:a,origin:"user",value:b})}};this.inputNumberKeyDownHandler=
a=>{if(!this.disabled&&!this.readOnly)if("ArrowUp"===a.key)a.preventDefault(),this.nudgeNumberValue("up",a);else if("ArrowDown"===a.key)this.nudgeNumberValue("down",a);else{var b=[...x.numberKeys,"ArrowLeft","ArrowRight","Backspace","Delete","Enter","Escape","Tab"];if(!(a.altKey||a.ctrlKey||a.metaKey)){var f=a.shiftKey&&"Tab"===a.key;if(b.includes(a.key)||f)"Enter"===a.key&&this.emitChangeIfUserModified();else if(e.numberStringFormatter.numberFormatOptions={locale:this.effectiveLocale,numberingSystem:this.numberingSystem,
useGrouping:this.groupSeparator},a.key!==e.numberStringFormatter.decimal||this.integer||!(!this.value&&!this.childNumberEl.value||this.value&&-1===this.childNumberEl.value.indexOf(e.numberStringFormatter.decimal)))if(!/[eE]/.test(a.key)||this.integer||(this.value||this.childNumberEl.value)&&(!this.value||/[eE]/.test(this.childNumberEl.value)))"-"===a.key&&(!this.value&&!this.childNumberEl.value||this.value&&2>=this.childNumberEl.value.split("-").length)||a.preventDefault()}}};this.nudgeNumberValue=
(a,b)=>{if(!(b instanceof KeyboardEvent&&b.repeat)){var f=this.maxString?parseFloat(this.maxString):null,l=this.minString?parseFloat(this.minString):null;this.incrementOrDecrementNumberValue(a,f,l,b);this.nudgeNumberValueIntervalId&&window.clearInterval(this.nudgeNumberValueIntervalId);var c=!0;this.nudgeNumberValueIntervalId=window.setInterval(()=>{c?c=!1:this.incrementOrDecrementNumberValue(a,f,l,b)},150)}};this.nudgeButtonPointerUpAndOutHandler=a=>{k.isPrimaryPointerButton(a)&&window.clearInterval(this.nudgeNumberValueIntervalId)};
this.nudgeButtonPointerDownHandler=a=>{if(k.isPrimaryPointerButton(a)){a.preventDefault();var b=a.target.dataset.adjustment;this.disabled||this.nudgeNumberValue(b,a)}};this.hiddenInputChangeHandler=a=>{a.target.name===this.name&&this.setNumberValue({value:a.target.value,origin:"direct"});a.stopPropagation()};this.setChildNumberElRef=a=>{this.childNumberEl=a};this.setInputNumberValue=a=>{this.childNumberEl&&(this.childNumberEl.value=a)};this.setPreviousEmittedNumberValue=a=>{this.previousEmittedNumberValue=
this.normalizeValue(a)};this.setPreviousNumberValue=a=>{this.previousValue=this.normalizeValue(a)};this.setNumberValue=({committing:a=!1,nativeEvent:b,origin:f,previousValue:l,value:c})=>{e.numberStringFormatter.numberFormatOptions={locale:this.effectiveLocale,numberingSystem:this.numberingSystem,useGrouping:this.groupSeparator};const h=this.previousValue?.length>c.length||this.value?.length>c.length;var g=this.integer?c.replace(/[e.]/g,""):c;const m="."===g.charAt(g.length-1);g=m&&h?g:e.sanitizeNumberString(g);
c=c&&!g?e.isValidNumber(this.previousValue)?this.previousValue:"":g;g=e.numberStringFormatter.localize(c);"connected"===f||m||(g=e.addLocalizedTrailingDecimalZeros(g,c,e.numberStringFormatter));this.localizedValue=m&&h?`${g}${e.numberStringFormatter.decimal}`:g;this.setPreviousNumberValue(l??this.value);this.previousValueOrigin=f;this.userChangedValue="user"===f&&this.value!==c;this.value=["-","."].includes(c)?"":c;"direct"===f&&(this.setInputNumberValue(g),this.setPreviousEmittedNumberValue(g));
b&&(this.calciteInputNumberInput.emit().defaultPrevented?(this.value=this.previousValue,this.localizedValue=e.numberStringFormatter.localize(this.previousValue)):a&&this.emitChangeIfUserModified())};this.inputNumberKeyUpHandler=()=>{window.clearInterval(this.nudgeNumberValueIntervalId)};this.alignment="start";this.disabled=this.clearable=this.autofocus=!1;this.form=void 0;this.hidden=this.groupSeparator=!1;this.icon=void 0;this.integer=this.iconFlipRtl=!1;this.label=void 0;this.loading=!1;this.numberingSystem=
void 0;this.localeFormat=!1;this.name=this.minLength=this.maxLength=this.min=this.max=void 0;this.numberButtonType="vertical";this.prefixText=this.placeholder=void 0;this.required=this.readOnly=!1;this.scale="m";this.status="idle";this.autocomplete=this.step=void 0;this.inputMode="decimal";this.suffixText=this.enterKeyHint=void 0;this.editingEnabled=!1;this.value="";this.messageOverrides=this.messages=void 0;this.effectiveLocale="";this.localizedValue=this.defaultMessages=void 0;this.slottedActionElDisabledInternally=
!1}disabledWatcher(){this.setDisabledAction()}maxWatcher(){this.maxString=this.max?.toString()||null}minWatcher(){this.minString=this.min?.toString()||null}onMessagesChange(){}valueWatcher(a,b){this.userChangedValue||(this.setNumberValue({origin:"direct",previousValue:b,value:null==a||""==a?"":e.isValidNumber(a)?a:this.previousValue||""}),this.warnAboutInvalidNumberValue(a));this.userChangedValue=!1}updateRequestedIcon(){this.requestedIcon=k.setRequestedIcon({},this.icon,"number")}get isClearable(){return this.clearable&&
0<this.value.length}effectiveLocaleWatcher(a){p.updateMessages(this,this.effectiveLocale);e.numberStringFormatter.numberFormatOptions={locale:a,numberingSystem:this.numberingSystem,useGrouping:!1}}connectedCallback(){q.connectInteractive(this);e.connectLocalized(this);p.connectMessages(this);if(this.inlineEditableEl=this.el.closest("calcite-inline-editable"))this.editingEnabled=this.inlineEditableEl.editingEnabled||!1;r.connectLabel(this);n.connectForm(this);this.setPreviousEmittedNumberValue(this.value);
this.setPreviousNumberValue(this.value);this.warnAboutInvalidNumberValue(this.value);this.setNumberValue({origin:"connected",value:e.isValidNumber(this.value)?this.value:""});this.mutationObserver?.observe(this.el,{childList:!0});this.setDisabledAction();this.el.addEventListener("calciteInternalHiddenInputChange",this.hiddenInputChangeHandler)}componentDidLoad(){t.setComponentLoaded(this)}disconnectedCallback(){q.disconnectInteractive(this);r.disconnectLabel(this);n.disconnectForm(this);e.disconnectLocalized(this);
p.disconnectMessages(this);this.mutationObserver?.disconnect();this.el.removeEventListener("calciteInternalHiddenInputChange",this.hiddenInputChangeHandler)}async componentWillLoad(){t.setUpLoadableComponent(this);this.maxString=this.max?.toString();this.minString=this.min?.toString();this.requestedIcon=k.setRequestedIcon({},this.icon,"number");await p.setUpMessages(this)}componentShouldUpdate(a,b,f){return"value"===f&&a&&!e.isValidNumber(a)?(this.setNumberValue({origin:"reset",value:b}),!1):!0}componentDidRender(){q.updateHostInteraction(this)}async setFocus(){await t.componentFocusable(this);
this.childNumberEl?.focus()}async selectText(){this.childNumberEl?.select()}onLabelClick(){this.setFocus()}incrementOrDecrementNumberValue(a,b,f,l){var {value:c}=this;a="up"===a?1:-1;var h=this.integer&&"any"!==this.step?Math.round(this.step):this.step;h="any"===h?1:Math.abs(h||1);c=(new e.BigDecimal(""!==c?c:"0")).add(`${h*a}`);b="number"===typeof f&&!isNaN(f)&&c.subtract(`${f}`).isNegative?`${f}`:"number"!==typeof b||isNaN(b)||c.subtract(`${b}`).isNegative?c.toString():`${b}`;this.setNumberValue({committing:!0,
nativeEvent:l,origin:"user",value:b})}onFormReset(){this.setNumberValue({origin:"reset",value:this.defaultValue})}syncHiddenFormInput(a){a.type="number";a.min=this.min?.toString(10)??"";a.max=this.max?.toString(10)??""}setDisabledAction(){const a=k.getSlotted(this.el,"action");a&&(this.disabled?(null==a.getAttribute("disabled")&&(this.slottedActionElDisabledInternally=!0),a.setAttribute("disabled","")):this.slottedActionElDisabledInternally&&(a.removeAttribute("disabled"),this.slottedActionElDisabledInternally=
!1))}normalizeValue(a){return e.isValidNumber(a)?a:""}warnAboutInvalidNumberValue(a){a&&!e.isValidNumber(a)&&console.warn(`The specified value "${a}" cannot be parsed, or is out of range.`)}render(){const a=k.getElementDir(this.el),b=d.h("div",{class:"loader"},d.h("calcite-progress",{label:this.messages.loading,type:"indeterminate"})),f=d.h("button",{"aria-label":this.messages.clear,class:"clear-button",disabled:this.disabled||this.readOnly,onClick:this.clearInputValue,tabIndex:-1,type:"button"},
d.h("calcite-icon",{icon:"x",scale:"l"===this.scale?"m":"s"})),l=d.h("calcite-icon",{class:"icon",flipRtl:this.iconFlipRtl,icon:this.requestedIcon,scale:"l"===this.scale?"m":"s"});var c="horizontal"===this.numberButtonType;const h=d.h("button",{"aria-hidden":"true",class:{["number-button-item"]:!0,["number-button-item--horizontal"]:c},"data-adjustment":"up",disabled:this.disabled||this.readOnly,onPointerDown:this.nudgeButtonPointerDownHandler,onPointerOut:this.nudgeButtonPointerUpAndOutHandler,onPointerUp:this.nudgeButtonPointerUpAndOutHandler,
tabIndex:-1,type:"button"},d.h("calcite-icon",{icon:"chevron-up",scale:"l"===this.scale?"m":"s"}));c=d.h("button",{"aria-hidden":"true",class:{["number-button-item"]:!0,["number-button-item--horizontal"]:c},"data-adjustment":"down",disabled:this.disabled||this.readOnly,onPointerDown:this.nudgeButtonPointerDownHandler,onPointerOut:this.nudgeButtonPointerUpAndOutHandler,onPointerUp:this.nudgeButtonPointerUpAndOutHandler,tabIndex:-1,type:"button"},d.h("calcite-icon",{icon:"chevron-down",scale:"l"===
this.scale?"m":"s"}));const g=d.h("div",{class:"number-button-wrapper"},h,c),m=d.h("div",{class:"prefix"},this.prefixText),B=d.h("div",{class:"suffix"},this.suffixText),C=d.h("input",{"aria-label":r.getLabelText(this),autocomplete:this.autocomplete,autofocus:this.autofocus?!0:null,defaultValue:this.defaultValue,disabled:this.disabled?!0:null,enterKeyHint:this.enterKeyHint,inputMode:this.inputMode,key:"localized-input",maxLength:this.maxLength,minLength:this.minLength,name:void 0,onBlur:this.inputNumberBlurHandler,
onFocus:this.inputNumberFocusHandler,onInput:this.inputNumberInputHandler,onKeyDown:this.inputNumberKeyDownHandler,onKeyUp:this.inputNumberKeyUpHandler,placeholder:this.placeholder||"",readOnly:this.readOnly,type:"text",value:this.localizedValue,ref:this.setChildNumberElRef});return d.h(d.Host,{onClick:this.clickHandler,onKeyDown:this.keyDownHandler},d.h("div",{class:{wrapper:!0,[k.CSS_UTILITY.rtl]:"rtl"===a}},"horizontal"!==this.numberButtonType||this.readOnly?null:c,this.prefixText?m:null,d.h("div",
{class:"element-wrapper"},C,this.isClearable?f:null,this.requestedIcon?l:null,this.loading?b:null),d.h("div",{class:"action-wrapper"},d.h("slot",{name:"action"})),"vertical"!==this.numberButtonType||this.readOnly?null:g,this.suffixText?B:null,"horizontal"!==this.numberButtonType||this.readOnly?null:h,d.h(n.HiddenFormInputSlot,{component:this})))}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{disabled:["disabledWatcher"],max:["maxWatcher"],min:["minWatcher"],
messageOverrides:["onMessagesChange"],value:["valueWatcher"],icon:["updateRequestedIcon"],effectiveLocale:["effectiveLocaleWatcher"]}}static get style(){return":host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale\x3ds]) input,:host([scale\x3ds]) .prefix,:host([scale\x3ds]) .suffix{block-size:1.5rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale\x3ds]) .number-button-wrapper,:host([scale\x3ds]) .action-wrapper calcite-button,:host([scale\x3ds]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale\x3ds]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale\x3dm]) input,:host([scale\x3dm]) .prefix,:host([scale\x3dm]) .suffix{block-size:2rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale\x3dm]) .number-button-wrapper,:host([scale\x3dm]) .action-wrapper calcite-button,:host([scale\x3dm]) .action-wrapper calcite-button button{block-size:2rem}:host([scale\x3dm]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale\x3dl]) input,:host([scale\x3dl]) .prefix,:host([scale\x3dl]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale\x3dl]) .number-button-wrapper,:host([scale\x3dl]) .action-wrapper calcite-button,:host([scale\x3dl]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale\x3dl]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host input{transition:var(--calcite-animation-timing), block-size 0, outline-offset 0s;-webkit-appearance:none;position:relative;margin:0px;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;border-radius:0px;background-color:var(--calcite-ui-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);color:var(--calcite-ui-text-1)}:host input::placeholder,:host input:-ms-input-placeholder,:host input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}:host input:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}:host input[readonly]{background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium)}:host input[readonly]:focus{color:var(--calcite-ui-text-1)}:host calcite-icon{color:var(--calcite-ui-text-3)}:host input{outline-color:transparent}:host input:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-ui-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-ui-focus-offset-invert),\n                1\n              )\n            )\n          )}:host([status\x3dinvalid]) input{border-color:var(--calcite-ui-danger)}:host([status\x3dinvalid]) input:focus{outline:2px solid var(--calcite-ui-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-ui-focus-offset-invert),\n                1\n              )\n            )\n          )}:host([scale\x3ds]) .icon{inset-inline-start:0.5rem}:host([scale\x3dm]) .icon{inset-inline-start:0.75rem}:host([scale\x3dl]) .icon{inset-inline-start:1rem}:host([icon][scale\x3ds]) input{padding-inline-start:2rem}:host([icon][scale\x3dm]) input{padding-inline-start:2.5rem}:host([icon][scale\x3dl]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:var(--calcite-app-z-index);display:block;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button{pointer-events:initial;order:4;margin:0px;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-ui-foreground-2);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:hover calcite-icon{color:var(--calcite-ui-text-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:active{background-color:var(--calcite-ui-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-ui-text-1)}.clear-button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-ui-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-ui-focus-offset-invert),\n                1\n              )\n            )\n          )}.clear-button:disabled{opacity:var(--calcite-ui-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-ui-text-2)}.prefix{order:2;border-inline-end-width:0px}.suffix{order:5;border-inline-start-width:0px}:host([alignment\x3dstart]) input{text-align:start}:host([alignment\x3dend]) input{text-align:end}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host([number-button-type\x3dvertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type\x3dvertical]) input{order:2}:host([number-button-type\x3dhorizontal]) .calcite--rtl .number-button-item[data-adjustment\x3ddown] calcite-icon{transform:rotate(-90deg)}:host([number-button-type\x3dhorizontal]) .calcite--rtl .number-button-item[data-adjustment\x3dup] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal[data-adjustment\x3ddown],.number-button-item.number-button-item--horizontal[data-adjustment\x3dup]{order:1;max-block-size:100%;min-block-size:100%;align-self:stretch}.number-button-item.number-button-item--horizontal[data-adjustment\x3ddown] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment\x3dup] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment\x3ddown]{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment\x3ddown]:hover{background-color:var(--calcite-ui-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment\x3ddown]:hover calcite-icon{color:var(--calcite-ui-text-1)}.number-button-item.number-button-item--horizontal[data-adjustment\x3dup]{order:5}.number-button-item.number-button-item--horizontal[data-adjustment\x3dup]:hover{background-color:var(--calcite-ui-foreground-2)}.number-button-item.number-button-item--horizontal[data-adjustment\x3dup]:hover calcite-icon{color:var(--calcite-ui-text-1)}:host([number-button-type\x3dvertical]) .number-button-item[data-adjustment\x3ddown]:hover{background-color:var(--calcite-ui-foreground-2)}:host([number-button-type\x3dvertical]) .number-button-item[data-adjustment\x3ddown]:hover calcite-icon{color:var(--calcite-ui-text-1)}:host([number-button-type\x3dvertical]) .number-button-item[data-adjustment\x3dup]:hover{background-color:var(--calcite-ui-foreground-2)}:host([number-button-type\x3dvertical]) .number-button-item[data-adjustment\x3dup]:hover calcite-icon{color:var(--calcite-ui-text-1)}:host([number-button-type\x3dvertical]) .number-button-item[data-adjustment\x3ddown]{border-block-start-width:0px}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0px;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);padding-block:0px;padding-inline:0.5rem;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.number-button-item:focus{background-color:var(--calcite-ui-foreground-2)}.number-button-item:focus calcite-icon{color:var(--calcite-ui-text-1)}.number-button-item:active{background-color:var(--calcite-ui-foreground-3)}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-ui-border-1)}:host .inline-child{background-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host .inline-child .editing-enabled{background-color:inherit}:host .inline-child:not(.editing-enabled){display:flex;cursor:pointer;border-color:transparent;padding-inline-start:0}::slotted(input[slot\x3dhidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}"}},
[1,"calcite-input-number",{alignment:[513],autofocus:[516],clearable:[516],disabled:[516],form:[513],groupSeparator:[516,"group-separator"],hidden:[516],icon:[520],iconFlipRtl:[516,"icon-flip-rtl"],integer:[4],label:[1],loading:[516],numberingSystem:[513,"numbering-system"],localeFormat:[4,"locale-format"],max:[514],min:[514],maxLength:[514,"max-length"],minLength:[514,"min-length"],name:[513],numberButtonType:[513,"number-button-type"],placeholder:[1],prefixText:[1,"prefix-text"],readOnly:[516,"read-only"],
required:[516],scale:[513],status:[513],step:[520],autocomplete:[1],inputMode:[1,"input-mode"],enterKeyHint:[1,"enter-key-hint"],suffixText:[1,"suffix-text"],editingEnabled:[1540,"editing-enabled"],value:[1025],messages:[1040],messageOverrides:[1040],effectiveLocale:[32],defaultMessages:[32],localizedValue:[32],slottedActionElDisabledInternally:[32],setFocus:[64],selectText:[64]}]);v();u.InputNumber=w;u.defineCustomElement=v});