import { readFileSync } from 'fs';
import { join } from 'path';

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    graph: {
      title: "Graph View"
    }
  }
};

// src/i18n/locales/en-GB.ts
var en_GB_default = {
  components: {
    graph: {
      title: "Graph View"
    }
  }
};

// src/i18n/locales/ar-SA.ts
var ar_SA_default = {
  components: {
    graph: {
      title: "\u0627\u0644\u062A\u0645\u062B\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A"
    }
  }
};

// src/i18n/locales/ca-ES.ts
var ca_ES_default = {
  components: {
    graph: {
      title: "Vista Gr\xE0fica"
    }
  }
};

// src/i18n/locales/cs-CZ.ts
var cs_CZ_default = {
  components: {
    graph: {
      title: "Graf"
    }
  }
};

// src/i18n/locales/de-DE.ts
var de_DE_default = {
  components: {
    graph: {
      title: "Graphansicht"
    }
  }
};

// src/i18n/locales/es-ES.ts
var es_ES_default = {
  components: {
    graph: {
      title: "Vista Gr\xE1fica"
    }
  }
};

// src/i18n/locales/fa-IR.ts
var fa_IR_default = {
  components: {
    graph: {
      title: "\u0646\u0645\u0627\u06CC \u06AF\u0631\u0627\u0641"
    }
  }
};

// src/i18n/locales/fi-FI.ts
var fi_FI_default = {
  components: {
    graph: {
      title: "Verkkon\xE4kym\xE4"
    }
  }
};

// src/i18n/locales/fr-FR.ts
var fr_FR_default = {
  components: {
    graph: {
      title: "Vue Graphique"
    }
  }
};

// src/i18n/locales/he-IL.ts
var he_IL_default = {
  components: {
    graph: {
      title: "\u05DE\u05D1\u05D8 \u05D2\u05E8\u05E3"
    }
  }
};

// src/i18n/locales/hu-HU.ts
var hu_HU_default = {
  components: {
    graph: {
      title: "Grafikonn\xE9zet"
    }
  }
};

// src/i18n/locales/id-ID.ts
var id_ID_default = {
  components: {
    graph: {
      title: "Tampilan Grafik"
    }
  }
};

// src/i18n/locales/it-IT.ts
var it_IT_default = {
  components: {
    graph: {
      title: "Vista grafico"
    }
  }
};

// src/i18n/locales/ja-JP.ts
var ja_JP_default = {
  components: {
    graph: {
      title: "\u30B0\u30E9\u30D5\u30D3\u30E5\u30FC"
    }
  }
};

// src/i18n/locales/kk-KZ.ts
var kk_KZ_default = {
  components: {
    graph: {
      title: "\u0413\u0440\u0430\u0444 \u043A\u04E9\u0440\u0456\u043D\u0456\u0441\u0456"
    }
  }
};

// src/i18n/locales/ko-KR.ts
var ko_KR_default = {
  components: {
    graph: {
      title: "\uADF8\uB798\uD504 \uBDF0"
    }
  }
};

// src/i18n/locales/lt-LT.ts
var lt_LT_default = {
  components: {
    graph: {
      title: "Grafiko Vaizdas"
    }
  }
};

// src/i18n/locales/nb-NO.ts
var nb_NO_default = {
  components: {
    graph: {
      title: "Graf-visning"
    }
  }
};

// src/i18n/locales/nl-NL.ts
var nl_NL_default = {
  components: {
    graph: {
      title: "Grafiekweergave"
    }
  }
};

// src/i18n/locales/pl-PL.ts
var pl_PL_default = {
  components: {
    graph: {
      title: "Graf"
    }
  }
};

// src/i18n/locales/pt-BR.ts
var pt_BR_default = {
  components: {
    graph: {
      title: "Vis\xE3o de gr\xE1fico"
    }
  }
};

// src/i18n/locales/ro-RO.ts
var ro_RO_default = {
  components: {
    graph: {
      title: "Graf"
    }
  }
};

// src/i18n/locales/ru-RU.ts
var ru_RU_default = {
  components: {
    graph: {
      title: "\u0412\u0438\u0434 \u0433\u0440\u0430\u0444\u0430"
    }
  }
};

// src/i18n/locales/th-TH.ts
var th_TH_default = {
  components: {
    graph: {
      title: "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E01\u0E23\u0E32\u0E1F"
    }
  }
};

// src/i18n/locales/tr-TR.ts
var tr_TR_default = {
  components: {
    graph: {
      title: "Grafik G\xF6r\xFCn\xFCm\xFC"
    }
  }
};

// src/i18n/locales/uk-UA.ts
var uk_UA_default = {
  components: {
    graph: {
      title: "\u0412\u0438\u0433\u043B\u044F\u0434 \u0433\u0440\u0430\u0444\u0430"
    }
  }
};

// src/i18n/locales/vi-VN.ts
var vi_VN_default = {
  components: {
    graph: {
      title: "S\u01A1 \u0111\u1ED3"
    }
  }
};

// src/i18n/locales/zh-CN.ts
var zh_CN_default = {
  components: {
    graph: {
      title: "\u5173\u7CFB\u56FE\u8C31"
    }
  }
};

// src/i18n/locales/zh-TW.ts
var zh_TW_default = {
  components: {
    graph: {
      title: "\u95DC\u4FC2\u5716\u8B5C"
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "en-GB": en_GB_default,
  "ar-SA": ar_SA_default,
  "ca-ES": ca_ES_default,
  "cs-CZ": cs_CZ_default,
  "de-DE": de_DE_default,
  "es-ES": es_ES_default,
  "fa-IR": fa_IR_default,
  "fi-FI": fi_FI_default,
  "fr-FR": fr_FR_default,
  "he-IL": he_IL_default,
  "hu-HU": hu_HU_default,
  "id-ID": id_ID_default,
  "it-IT": it_IT_default,
  "ja-JP": ja_JP_default,
  "kk-KZ": kk_KZ_default,
  "ko-KR": ko_KR_default,
  "lt-LT": lt_LT_default,
  "nb-NO": nb_NO_default,
  "nl-NL": nl_NL_default,
  "pl-PL": pl_PL_default,
  "pt-BR": pt_BR_default,
  "ro-RO": ro_RO_default,
  "ru-RU": ru_RU_default,
  "th-TH": th_TH_default,
  "tr-TR": tr_TR_default,
  "uk-UA": uk_UA_default,
  "vi-VN": vi_VN_default,
  "zh-CN": zh_CN_default,
  "zh-TW": zh_TW_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/styles/graph.scss
var graph_default = ".graph > h3 {\n  font-size: 1rem;\n  margin: 0;\n}\n.graph > .graph-outer {\n  border-radius: 5px;\n  border: 1px solid var(--lightgray);\n  box-sizing: border-box;\n  height: 250px;\n  margin: 0.5em 0;\n  position: relative;\n  overflow: hidden;\n}\n.graph > .graph-outer > .global-graph-icon {\n  cursor: pointer;\n  background: none;\n  border: none;\n  color: var(--dark);\n  opacity: 0.5;\n  width: 24px;\n  height: 24px;\n  position: absolute;\n  padding: 0.2rem;\n  margin: 0.3rem;\n  top: 0;\n  right: 0;\n  border-radius: 4px;\n  background-color: transparent;\n  transition: background-color 0.5s ease;\n}\n.graph > .graph-outer > .global-graph-icon:hover {\n  background-color: var(--lightgray);\n}\n.graph > .global-graph-outer {\n  position: fixed;\n  z-index: 9999;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100%;\n  backdrop-filter: blur(4px);\n  display: none;\n  overflow: hidden;\n}\n.graph > .global-graph-outer.active {\n  display: inline-block;\n}\n.graph > .global-graph-outer > .global-graph-container {\n  border: 1px solid var(--lightgray);\n  background-color: var(--light);\n  border-radius: 5px;\n  box-sizing: border-box;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  height: 80vh;\n  width: 80vw;\n}\n@media all and (max-width: 800px) {\n  .graph > .global-graph-outer > .global-graph-container {\n    width: 90%;\n  }\n}\n\n.graph-container {\n  width: 100%;\n  height: 100%;\n}";

// src/components/scripts/graph.inline.ts
var graph_inline_default = `var bt=Object.hasOwnProperty;var Be,x,ye,st,q,Ee,be,xe,Ou,yu,_u,Se,Nu,Iu,zu,ct,we={},xu=[],Ft=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,wu=Array.isArray;function N(u,e){for(var t in e)u[t]=e[t];return u}function $u(u){u&&u.parentNode&&u.parentNode.removeChild(u)}function Gu(u,e,t,a,o){var n={type:u,props:e,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o??++ye,__i:-1,__u:0};return o==null&&x.vnode!=null&&x.vnode(n),n}function su(u){return u.children}function bu(u,e){this.props=u,this.context=e}function lu(u,e){if(e==null)return u.__?lu(u.__,u.__i+1):null;for(var t;e<u.__k.length;e++)if((t=u.__k[e])!=null&&t.__e!=null)return t.__e;return typeof u.type=="function"?lu(u):null}function ft(u){if(u.__P&&u.__d){var e=u.__v,t=e.__e,a=[],o=[],n=N({},e);n.__v=e.__v+1,x.vnode&&x.vnode(n),je(u.__P,n,e,u.__n,u.__P.namespaceURI,32&e.__u?[t]:null,a,t??lu(e),!!(32&e.__u),o),n.__v=e.__v,n.__.__k[n.__i]=n,ht(a,n,o),e.__e=e.__=null,n.__e!=t&&ke(n)}}function ke(u){if((u=u.__)!=null&&u.__c!=null)return u.__e=u.__c.base=null,u.__k.some(function(e){if(e!=null&&e.__e!=null)return u.__e=u.__c.base=e.__e}),ke(u)}function ge(u){(!u.__d&&(u.__d=!0)&&q.push(u)&&!Su.__r++||Ee!=x.debounceRendering)&&((Ee=x.debounceRendering)||be)(Su)}function Su(){try{for(var u,e=1;q.length;)q.length>e&&q.sort(xe),u=q.shift(),e=q.length,ft(u)}finally{q.length=Su.__r=0}}function Le(u,e,t,a,o,n,l,c,f,D,d){var r,E,_,S,w,y,C,v=a&&a.__k||xu,M=e.length;for(f=_t(t,e,v,f,M),r=0;r<M;r++)(_=t.__k[r])!=null&&(E=_.__i!=-1&&v[_.__i]||we,_.__i=r,y=je(u,_,E,o,n,l,c,f,D,d),S=_.__e,_.ref&&E.ref!=_.ref&&(E.ref&&Vu(E.ref,null,_),d.push(_.ref,_.__c||S,_)),w==null&&S!=null&&(w=S),(C=!!(4&_.__u))||E.__k===_.__k?(f=Pe(_,f,u,C),C&&E.__e&&(E.__e=null)):typeof _.type=="function"&&y!==void 0?f=y:S&&(f=S.nextSibling),_.__u&=-7);return t.__e=w,f}function _t(u,e,t,a,o){var n,l,c,f,D,d=t.length,r=d,E=0;for(u.__k=new Array(o),n=0;n<o;n++)(l=e[n])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=u.__k[n]=Gu(null,l,null,null,null):wu(l)?l=u.__k[n]=Gu(su,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=u.__k[n]=Gu(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):u.__k[n]=l,f=n+E,l.__=u,l.__b=u.__b+1,c=null,(D=l.__i=dt(l,t,f,r))!=-1&&(r--,(c=t[D])&&(c.__u|=2)),c==null||c.__v==null?(D==-1&&(o>d?E--:o<d&&E++),typeof l.type!="function"&&(l.__u|=4)):D!=f&&(D==f-1?E--:D==f+1?E++:(D>f?E--:E++,l.__u|=4))):u.__k[n]=null;if(r)for(n=0;n<d;n++)(c=t[n])!=null&&(2&c.__u)==0&&(c.__e==a&&(a=lu(c)),We(c,c));return a}function Pe(u,e,t,a){var o,n;if(typeof u.type=="function"){for(o=u.__k,n=0;o&&n<o.length;n++)o[n]&&(o[n].__=u,e=Pe(o[n],e,t,a));return e}u.__e!=e&&(a&&(e&&u.type&&!e.parentNode&&(e=lu(u)),t.insertBefore(u.__e,e||null)),e=u.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function dt(u,e,t,a){var o,n,l,c=u.key,f=u.type,D=e[t],d=D!=null&&(2&D.__u)==0;if(D===null&&c==null||d&&c==D.key&&f==D.type)return t;if(a>(d?1:0)){for(o=t-1,n=t+1;o>=0||n<e.length;)if((D=e[l=o>=0?o--:n++])!=null&&(2&D.__u)==0&&c==D.key&&f==D.type)return l}return-1}function Ae(u,e,t){e[0]=="-"?u.setProperty(e,t??""):u[e]=t==null?"":typeof t!="number"||Ft.test(e)?t:t+"px"}function Bu(u,e,t,a,o){var n,l;u:if(e=="style")if(typeof t=="string")u.style.cssText=t;else{if(typeof a=="string"&&(u.style.cssText=a=""),a)for(e in a)t&&e in t||Ae(u.style,e,"");if(t)for(e in t)a&&t[e]==a[e]||Ae(u.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")n=e!=(e=e.replace(Se,"$1")),l=e.toLowerCase(),e=l in u||e=="onFocusOut"||e=="onFocusIn"?l.slice(2):e.slice(2),u.l||(u.l={}),u.l[e+n]=t,t?a?t[_u]=a[_u]:(t[_u]=Nu,u.addEventListener(e,n?zu:Iu,n)):u.removeEventListener(e,n?zu:Iu,n);else{if(o=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in u)try{u[e]=t??"";break u}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?u.removeAttribute(e):u.setAttribute(e,e=="popover"&&t==1?"":t))}}function me(u){return function(e){if(this.l){var t=this.l[e.type+u];if(e[yu]==null)e[yu]=Nu++;else if(e[yu]<t[_u])return;return t(x.event?x.event(e):e)}}}function je(u,e,t,a,o,n,l,c,f,D){var d,r,E,_,S,w,y,C,v,M,G,I,Q,J,uu,T=e.type;if(e.constructor!==void 0)return null;128&t.__u&&(f=!!(32&t.__u),n=[c=e.__e=t.__e]),(d=x.__b)&&d(e);u:if(typeof T=="function")try{if(C=e.props,v=T.prototype&&T.prototype.render,M=(d=T.contextType)&&a[d.__c],G=d?M?M.props.value:d.__:a,t.__c?y=(r=e.__c=t.__c).__=r.__E:(v?e.__c=r=new T(C,G):(e.__c=r=new bu(C,G),r.constructor=T,r.render=Ct),M&&M.sub(r),r.state||(r.state={}),r.__n=a,E=r.__d=!0,r.__h=[],r._sb=[]),v&&r.__s==null&&(r.__s=r.state),v&&T.getDerivedStateFromProps!=null&&(r.__s==r.state&&(r.__s=N({},r.__s)),N(r.__s,T.getDerivedStateFromProps(C,r.__s))),_=r.props,S=r.state,r.__v=e,E)v&&T.getDerivedStateFromProps==null&&r.componentWillMount!=null&&r.componentWillMount(),v&&r.componentDidMount!=null&&r.__h.push(r.componentDidMount);else{if(v&&T.getDerivedStateFromProps==null&&C!==_&&r.componentWillReceiveProps!=null&&r.componentWillReceiveProps(C,G),e.__v==t.__v||!r.__e&&r.shouldComponentUpdate!=null&&r.shouldComponentUpdate(C,r.__s,G)===!1){e.__v!=t.__v&&(r.props=C,r.state=r.__s,r.__d=!1),e.__e=t.__e,e.__k=t.__k,e.__k.some(function($){$&&($.__=e)}),xu.push.apply(r.__h,r._sb),r._sb=[],r.__h.length&&l.push(r);break u}r.componentWillUpdate!=null&&r.componentWillUpdate(C,r.__s,G),v&&r.componentDidUpdate!=null&&r.__h.push(function(){r.componentDidUpdate(_,S,w)})}if(r.context=G,r.props=C,r.__P=u,r.__e=!1,I=x.__r,Q=0,v)r.state=r.__s,r.__d=!1,I&&I(e),d=r.render(r.props,r.state,r.context),xu.push.apply(r.__h,r._sb),r._sb=[];else do r.__d=!1,I&&I(e),d=r.render(r.props,r.state,r.context),r.state=r.__s;while(r.__d&&++Q<25);r.state=r.__s,r.getChildContext!=null&&(a=N(N({},a),r.getChildContext())),v&&!E&&r.getSnapshotBeforeUpdate!=null&&(w=r.getSnapshotBeforeUpdate(_,S)),J=d!=null&&d.type===su&&d.key==null?Te(d.props.children):d,c=Le(u,wu(J)?J:[J],e,t,a,o,n,l,c,f,D),r.base=e.__e,e.__u&=-161,r.__h.length&&l.push(r),y&&(r.__E=r.__=null)}catch($){if(e.__v=null,f||n!=null)if($.then){for(e.__u|=f?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;n[n.indexOf(c)]=null,e.__e=c}else{for(uu=n.length;uu--;)$u(n[uu]);Hu(e)}else e.__e=t.__e,e.__k=t.__k,$.then||Hu(e);x.__e($,e,t)}else n==null&&e.__v==t.__v?(e.__k=t.__k,e.__e=t.__e):c=e.__e=pt(t.__e,e,t,a,o,n,l,f,D);return(d=x.diffed)&&d(e),128&e.__u?void 0:c}function Hu(u){u&&(u.__c&&(u.__c.__e=!0),u.__k&&u.__k.some(Hu))}function ht(u,e,t){for(var a=0;a<t.length;a++)Vu(t[a],t[++a],t[++a]);x.__c&&x.__c(e,u),u.some(function(o){try{u=o.__h,o.__h=[],u.some(function(n){n.call(o)})}catch(n){x.__e(n,o.__v)}})}function Te(u){return typeof u!="object"||u==null||u.__b>0?u:wu(u)?u.map(Te):N({},u)}function pt(u,e,t,a,o,n,l,c,f){var D,d,r,E,_,S,w,y=t.props||we,C=e.props,v=e.type;if(v=="svg"?o="http://www.w3.org/2000/svg":v=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),n!=null){for(D=0;D<n.length;D++)if((_=n[D])&&"setAttribute"in _==!!v&&(v?_.localName==v:_.nodeType==3)){u=_,n[D]=null;break}}if(u==null){if(v==null)return document.createTextNode(C);u=document.createElementNS(o,v,C.is&&C),c&&(x.__m&&x.__m(e,n),c=!1),n=null}if(v==null)y===C||c&&u.data==C||(u.data=C);else{if(n=n&&Be.call(u.childNodes),!c&&n!=null)for(y={},D=0;D<u.attributes.length;D++)y[(_=u.attributes[D]).name]=_.value;for(D in y)_=y[D],D=="dangerouslySetInnerHTML"?r=_:D=="children"||D in C||D=="value"&&"defaultValue"in C||D=="checked"&&"defaultChecked"in C||Bu(u,D,null,_,o);for(D in C)_=C[D],D=="children"?E=_:D=="dangerouslySetInnerHTML"?d=_:D=="value"?S=_:D=="checked"?w=_:c&&typeof _!="function"||y[D]===_||Bu(u,D,_,y[D],o);if(d)c||r&&(d.__html==r.__html||d.__html==u.innerHTML)||(u.innerHTML=d.__html),e.__k=[];else if(r&&(u.innerHTML=""),Le(e.type=="template"?u.content:u,wu(E)?E:[E],e,t,a,v=="foreignObject"?"http://www.w3.org/1999/xhtml":o,n,l,n?n[0]:t.__k&&lu(t,0),c,f),n!=null)for(D=n.length;D--;)$u(n[D]);c||(D="value",v=="progress"&&S==null?u.removeAttribute("value"):S!=null&&(S!==u[D]||v=="progress"&&!S||v=="option"&&S!=y[D])&&Bu(u,D,S,y[D],o),D="checked",w!=null&&w!=u[D]&&Bu(u,D,w,y[D],o))}return u}function Vu(u,e,t){try{if(typeof u=="function"){var a=typeof u.__u=="function";a&&u.__u(),a&&e==null||(u.__u=u(e))}else u.current=e}catch(o){x.__e(o,t)}}function We(u,e,t){var a,o;if(x.unmount&&x.unmount(u),(a=u.ref)&&(a.current&&a.current!=u.__e||Vu(a,null,e)),(a=u.__c)!=null){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(n){x.__e(n,e)}a.base=a.__P=null}if(a=u.__k)for(o=0;o<a.length;o++)a[o]&&We(a[o],e,t||typeof u.type!="function");t||$u(u.__e),u.__c=u.__=u.__e=void 0}function Ct(u,e,t){return this.constructor(u,t)}Be=xu.slice,x={__e:function(u,e,t,a){for(var o,n,l;e=e.__;)if((o=e.__c)&&!o.__)try{if((n=o.constructor)&&n.getDerivedStateFromError!=null&&(o.setState(n.getDerivedStateFromError(u)),l=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(u,a||{}),l=o.__d),l)return o.__E=o}catch(c){u=c}throw u}},ye=0,st=function(u){return u!=null&&u.constructor===void 0},bu.prototype.setState=function(u,e){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=N({},this.state),typeof u=="function"&&(u=u(N({},t),this.props)),u&&N(t,u),u!=null&&this.__v&&(e&&this._sb.push(e),ge(this))},bu.prototype.forceUpdate=function(u){this.__v&&(this.__e=!0,u&&this.__h.push(u),ge(this))},bu.prototype.render=su,q=[],be=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,xe=function(u,e){return u.__v.__b-e.__v.__b},Su.__r=0,Ou=Math.random().toString(8),yu="__d"+Ou,_u="__a"+Ou,Se=/(PointerCapture)$|Capture$/i,Nu=0,Iu=me(!1),zu=me(!0),ct=0;function K(u){let e=At(gt(u,"index"),!0);return e.length===0?"/":e}function Me(){let u=window.location.pathname;return u.endsWith("/")&&(u=u.slice(0,-1)),u.startsWith("/")&&(u=u.slice(1)),u}function qu(){return typeof document>"u"?"":document.body?.dataset?.basepath??""}function Ku(u,e){let t=e??qu(),a=u.startsWith("/")?u:"/"+u;return t+a}function Et(u,e){return u===e||u.endsWith("/"+e)}function gt(u,e){return Et(u,e)&&(u=u.slice(0,-e.length)),u}function At(u,e){return u.startsWith("/")&&(u=u.substring(1)),!e&&u.endsWith("/")&&(u=u.slice(0,-1)),u}function Ue(u){for(;u.firstChild;)u.removeChild(u.firstChild)}function Ju(u){return u.endsWith(".base")}function Re(u,e=Ju){let t=new Map;for(let{source:l,target:c}of u){let f=t.get(l);f||(f=new Set,t.set(l,f)),f.add(c)}function a(l,c){if(!e(l))return new Set([l]);if(c.has(l))return new Set;c.add(l);let f=new Set;for(let D of t.get(l)??[])for(let d of a(D,c))f.add(d);return f}let o=[],n=new Set;for(let{source:l,target:c}of u)if(!e(l))for(let f of a(c,new Set)){if(l===f)continue;let D=l+"\\0"+f;n.has(D)||(n.add(D),o.push({source:l,target:f}))}return o}(function(){function u(){var a=Me(),o=qu();return o&&a.startsWith(o.replace(/^\\//,""))&&(a=a.slice(o.replace(/^\\//,"").length),a.startsWith("/")&&(a=a.slice(1))),a}function e(a){var o=document.querySelector('script[src="'+a+'"]');return o?Promise.resolve():new Promise(function(n,l){var c=document.createElement("script");c.src=a,c.crossOrigin="anonymous",c.onload=n,c.onerror=l,document.head.appendChild(c)})}Promise.all([e("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"),e("https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.js")]).then(function(){t()}).catch(function(a){console.error("[Graph] Failed to load libraries:",a);for(var o=document.querySelectorAll(".graph-container"),n=0;n<o.length;n++)o[n].textContent="Graph could not load. Check your network connection.",o[n].style.display="flex",o[n].style.alignItems="center",o[n].style.justifyContent="center",o[n].style.color="var(--gray)",o[n].style.fontSize="0.9rem"});function t(){var a=window.d3,o=window.PIXI;if(!a||!o){console.error("[Graph] Libraries not loaded");return}var n="graph-visited";function l(){return new Set(JSON.parse(localStorage.getItem(n)||"[]"))}function c(h){var k=l();k.add(h),localStorage.setItem(n,JSON.stringify(Array.from(k)))}function f(h,k){if(!h)return k;var A=document.createElement("div");A.style.color=h,A.style.position="absolute",A.style.visibility="hidden",document.body.appendChild(A);var m=getComputedStyle(A).color;return A.remove(),m||k}async function D(h,k,A){var m=K(k);m===""&&(m="index");var V=l();if(Ue(h),A!==void 0&&A!==E)return console.log("[Graph] Stale render, skipping"),function(){};var b=JSON.parse(h.dataset.cfg||"{}"),cu=b.drag,Oe=b.zoom,Xu=b.depth,Yu=b.scale||1,Ge=b.repelForce||.5,Ie=b.centerForce||.3,ze=b.linkDistance||30,He=b.fontSize||.6,Ne=b.opacityScale||1,$e=b.removeTags||[],Ve=b.removeSlugs||[],ku=b.baseEmbeds||[],Zu=b.showTags,qe=b.focusOnHover,Ke=b.enableRadial,X;try{var Qu=await fetchData;X=new Map;for(var ue in Qu){var ee=K(ue);Ve.indexOf(ee)===-1&&X.set(ee,Qu[ue])}}catch(i){return console.error("[Graph] Error loading data:",i),function(){}}var R=h.offsetWidth,O=Math.max(h.offsetHeight,250),Lu=[],du=[],hu=new Set(X.keys());X.forEach(function(i,s){for(var F=i.links||[],g=0;g<F.length;g++){var p=K(F[g]);hu.has(p)&&Lu.push({source:s,target:p})}});for(var B=0;B<ku.length;B++){var te=K(ku[B].source),re=K(ku[B].target);hu.has(te)&&hu.has(re)&&Lu.push({source:te,target:re})}var Fu=Re(Lu);X.forEach(function(i,s){if(!Ju(s)&&Zu)for(var F=i.tags||[],g=0;g<F.length;g++){var p=F[g];if($e.indexOf(p)===-1){var j=K("tags/"+p);du.indexOf(j)===-1&&du.push(j),Fu.push({source:s,target:j})}}});var eu=new Set;if(Xu>=0)for(var pu=[m],Cu=new Set([m]),ne=0;ne<=Xu&&pu.length>0;ne++){for(var Pu=[],ju=0;ju<pu.length;ju++){var Tu=pu[ju];eu.add(Tu);for(var Wu=0;Wu<Fu.length;Wu++){var W=Fu[Wu];W.source===Tu&&!Cu.has(W.target)&&(Cu.add(W.target),Pu.push(W.target)),W.target===Tu&&!Cu.has(W.source)&&(Cu.add(W.source),Pu.push(W.source))}}pu=Pu}else{hu.forEach(function(i){!Zu&&i.startsWith("tags/")||eu.add(i)});for(var B=0;B<du.length;B++)eu.add(du[B])}var tu=[],Mu=new Map;eu.forEach(function(i){var s=i.startsWith("tags/"),F=s?"#"+i.substring(5):X.get(i)?.title||i,g=s?[]:X.get(i)?.tags||[],p={id:i,text:F,tags:g,x:Math.random()*R-R/2,y:Math.random()*O-O/2,vx:0,vy:0};tu.push(p),Mu.set(i,p)});for(var H=[],B=0;B<Fu.length;B++){var W=Fu[B];if(eu.has(W.source)&&eu.has(W.target)){var oe=Mu.get(W.source),ae=Mu.get(W.target);oe&&ae&&H.push({source:oe,target:ae})}}var Y=getComputedStyle(document.documentElement),Je=f(Y.getPropertyValue("--secondary").trim(),"#c792ea"),ie=f(Y.getPropertyValue("--tertiary").trim(),"#82aaff"),De=f(Y.getPropertyValue("--gray").trim(),"#6c6c6c"),le=f(Y.getPropertyValue("--lightgray").trim(),"#d4d4d4"),Xe=f(Y.getPropertyValue("--dark").trim(),"#1a1a1a"),Ye=f(Y.getPropertyValue("--light").trim(),"#f5f5f5"),Ze=Y.getPropertyValue("--bodyFont").trim()||"inherit",Z=new o.Application;await Z.init({width:R,height:O,antialias:!0,backgroundAlpha:0,resolution:window.devicePixelRatio||1,autoDensity:!0,eventMode:"static"}),h.appendChild(Z.canvas);var ru=new o.Container;Z.stage.addChild(ru);var nu=a.forceSimulation(tu).force("charge",a.forceManyBody().strength(-100*Ge)).force("center",a.forceCenter().strength(Ie)).force("link",a.forceLink(H).distance(ze)).force("collide",a.forceCollide().radius(function(i){for(var s=0,F=0;F<H.length;F++)(H[F].source.id===i.id||H[F].target.id===i.id)&&s++;return 2+Math.sqrt(s)}).iterations(3));if(Ke){var Uu=Math.min(R,O)/2*.8;nu.force("radial",a.forceRadial(Uu).strength(.2))}var se=new o.Container,ce=new o.Container,vu=new o.Container;ru.addChild(se),ru.addChild(ce),ru.addChild(vu);var L=[],z=[],fu=null,ou=new Set,Fe=0,Eu=!1,P=a.zoomIdentity;function fe(i){for(var s=0,F=0;F<H.length;F++)(H[F].source.id===i.id||H[F].target.id===i.id)&&s++;return 2+Math.sqrt(s)}function Qe(i){var s=i.id===m;return s?Je:V.has(i.id)||i.id.startsWith("tags/")?ie:De}function Ru(i){if(fu=i,i===null){ou=new Set;for(var s=0;s<L.length;s++)L[s].active=!1;for(var s=0;s<z.length;s++)z[s].active=!1}else{ou=new Set;for(var s=0;s<z.length;s++){var F=z[s].simulationData;F.source.id===i||F.target.id===i?(ou.add(F.source.id),ou.add(F.target.id),z[s].active=!0):z[s].active=!1}ou.add(i);for(var s=0;s<L.length;s++)ou.has(L[s].simulationData.id)?L[s].active=!0:L[s].active=!1}}function ut(){for(var i=0;i<z.length;i++){var s=z[i],F=1;fu!==null&&(F=s.active?1:.2),s.alpha=F,s.color=s.active?De:le}}function et(){for(var i=1/Yu,s=i*1.1,F=0;F<L.length;F++){var g=L[F];fu===g.simulationData.id?(g.label.alpha=1,g.label.scale.set(s)):g.label.scale.set(i)}}function tt(){for(var i=0;i<L.length;i++){var s=L[i],F=1;fu!==null&&qe&&(F=s.active?1:.2),s.gfx.alpha=F}}function gu(){tt(),ut(),et()}for(var B=0;B<tu.length;B++){var au=tu[B],_e=au.id,de=_e.startsWith("tags/"),Uu=fe(au),he=Qe(au),iu=new o.Text({text:au.text,style:{fontSize:He*15,fill:Xe,fontFamily:Ze},resolution:window.devicePixelRatio*4});iu.anchor.set(.5,1.2),iu.alpha=0,iu.scale.set(1/Yu),vu.addChild(iu);var U=new o.Graphics;U.circle(0,0,Uu),U.fill({color:de?Ye:he}),de&&U.stroke({width:2,color:ie}),U.eventMode="static",U.cursor="pointer",U.label=_e,(function(F,g,p){var j=0;g.on("pointerover",function(Du){Ru(F.id),j=p.alpha,Eu||gu()}),g.on("pointerleave",function(){Ru(null),p.alpha=j,Eu||gu()})})(au,U,iu),ce.addChild(U),L.push({simulationData:au,gfx:U,label:iu,color:he,alpha:1,active:!1})}for(var B=0;B<H.length;B++){var W=H[B],U=new o.Graphics;U.eventMode="none",se.addChild(U),z.push({simulationData:W,gfx:U,color:le,alpha:1,active:!1})}if(cu){var rt=function(i){for(var s=(i.x-P.x)/P.k,F=(i.y-P.y)/P.k,g=0;g<tu.length;g++){var p=tu[g],j=s-p.x-R/2,Du=F-p.y-O/2,Au=Math.sqrt(j*j+Du*Du),mu=fe(p);if(Au<mu+5)return p}return null},nt=function(i){i.active||nu.alphaTarget(1).restart(),i.subject.fx=i.subject.x,i.subject.fy=i.subject.y;var s=(i.x-P.x)/P.k-R/2,F=(i.y-P.y)/P.k-O/2;i.subject.__dragOffset={x:s-i.subject.x,y:F-i.subject.y},Fe=Date.now(),Eu=!0,fu=i.subject.id},ot=function(i){var s=(i.x-P.x)/P.k-R/2,F=(i.y-P.y)/P.k-O/2;i.subject.fx=s-i.subject.__dragOffset.x,i.subject.fy=F-i.subject.__dragOffset.y},at=function(i){if(i.active||nu.alphaTarget(0),i.subject.fx=null,i.subject.fy=null,Eu=!1,Ru(null),gu(),Date.now()-Fe<500){var s=Ku(i.subject.id);window.location.href=s}},it=a.drag().container(Z.canvas).subject(rt).on("start",nt).on("drag",ot).on("end",at);a.select(Z.canvas).call(it)}else for(var B=0;B<L.length;B++)(function(s){s.gfx.on("click",function(){var F=Ku(s.simulationData.id);window.location.href=F})})(L[B]);if(Oe){var Dt=function(i){P=i.transform,ru.scale.set(P.k,P.k),ru.position.set(P.x,P.y);for(var s=P.k*Ne,F=Math.max((s-1)/3.75,0),g=[],p=0;p<L.length;p++)L[p].active&&g.push(L[p].label);for(var p=0;p<vu.children.length;p++){var j=vu.children[p];g.indexOf(j)===-1&&(j.alpha=F)}},lt=a.zoom().extent([[0,0],[R,O]]).scaleExtent([.25,4]).on("zoom",Dt);a.select(Z.canvas).call(lt)}var pe=!1;function Ce(){if(!pe){for(var i=0;i<L.length;i++){var s=L[i],F=s.simulationData.x,g=s.simulationData.y;F!=null&&g!=null&&(s.gfx.position.set(F+R/2,g+O/2),s.label&&s.label.position.set(F+R/2,g+O/2))}for(var i=0;i<z.length;i++){var p=z[i],j=p.simulationData,Du=j.source.x,Au=j.source.y,mu=j.target.x,ve=j.target.y;Du!=null&&Au!=null&&mu!=null&&ve!=null&&(p.gfx.clear(),p.gfx.moveTo(Du+R/2,Au+O/2),p.gfx.lineTo(mu+R/2,ve+O/2),p.gfx.stroke({alpha:p.alpha,width:1,color:p.color}))}requestAnimationFrame(Ce)}}return nu.on("tick",function(){}),nu.restart(),gu(),Ce(),function(){pe=!0,nu.stop();try{Z.destroy(!0)}catch{}}}var d=[],r=[],E=0;function _(){for(var h=0;h<d.length;h++)d[h]();d=[]}function S(){for(var h=0;h<r.length;h++)r[h]();r=[]}var w=[],y=[],C=null,v=null,M=null;function G(){S();for(var h=0;h<w.length;h++){w[h].classList.remove("active");var k=w[h].closest(".sidebar");k&&(k.style.zIndex="")}}function I(){for(var h=0;h<w.length;h++)if(w[h].classList.contains("active"))return!0;return!1}function Q(){S();for(var h=u(),k=0;k<w.length;k++){var A=w[k];A.classList.add("active");var m=A.closest(".sidebar");m&&(m.style.zIndex="1");var V=A.querySelector(".global-graph-container");V&&(function(b){D(b,h,void 0).then(function(cu){r.push(cu)}).catch(function(cu){console.error("[Graph] Global render error:",cu)})})(V)}}function J(){I()?G():Q()}function uu(){_();var h=++E,k=u();c(k);for(var A=document.querySelectorAll(".graph-container"),m=0;m<A.length;m++)(function(V){D(V,k,h).then(function(b){h===E&&d.push(b)}).catch(function(b){console.error("[Graph] Local render error:",b)})})(A[m])}function T(h){var k=h.detail?h.detail.url:u();if(c(K(k)),uu(),w=Array.from(document.querySelectorAll(".global-graph-outer")),M)for(var A=0;A<y.length;A++)y[A].removeEventListener("click",M);y=Array.from(document.querySelectorAll(".global-graph-icon")),M=function(){J()};for(var A=0;A<y.length;A++)y[A].addEventListener("click",M);C&&document.removeEventListener("click",C),C=function(m){if(I()){var V=m.target.closest(".global-graph-container"),b=m.target.closest(".global-graph-icon");!V&&!b&&G()}},document.addEventListener("click",C),v&&document.removeEventListener("keydown",v),v=function(m){if(m.key==="Escape"){I()&&G();return}m.key==="g"&&(m.ctrlKey||m.metaKey)&&!m.shiftKey&&(m.preventDefault(),J())},document.addEventListener("keydown",v),I()&&Q()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){T({detail:{url:u()}})}):T({detail:{url:u()}}),document.addEventListener("prenav",function(){_(),S()}),document.addEventListener("nav",T),document.addEventListener("render",T);function $(){uu(),I()&&Q()}document.addEventListener("themechange",$)}})();
`;

// ../shared/collapse-edges.ts
function isBaseSlug(slug) {
  return slug.endsWith(".base");
}

// ../shared/find-base-embeds.ts
var embedRegex = /!\[\[([^\]|#]+)/g;
function buildBaseLookup(baseFiles) {
  const lookup = /* @__PURE__ */ new Map();
  for (const f3 of baseFiles) {
    const fileName = f3.slug.split("/").pop() ?? "";
    const nameNoExt = fileName.replace(/\.base$/i, "");
    lookup.set(fileName.toLowerCase(), f3.slug);
    lookup.set(nameNoExt.toLowerCase(), f3.slug);
    lookup.set(f3.slug.toLowerCase(), f3.slug);
  }
  return lookup;
}
function findBaseEmbedEdges(allFiles, contentDir) {
  const baseFiles = allFiles.filter((f3) => isBaseSlug(f3.slug));
  if (baseFiles.length === 0) return [];
  const lookup = buildBaseLookup(baseFiles);
  const edges = [];
  for (const file of allFiles) {
    if (isBaseSlug(file.slug) || !file.relativePath) continue;
    let raw;
    try {
      raw = readFileSync(join(contentDir, file.relativePath), "utf-8");
    } catch {
      continue;
    }
    embedRegex.lastIndex = 0;
    let match;
    while (match = embedRegex.exec(raw)) {
      const target = match[1]?.trim().toLowerCase();
      const baseSlug = target ? lookup.get(target) : void 0;
      if (baseSlug) edges.push({ source: file.slug, target: baseSlug });
    }
  }
  return edges;
}
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/Graph.tsx
var defaultOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: 1,
    scale: 1.1,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    removeSlugs: [],
    focusOnHover: false,
    enableRadial: false
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.2,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    removeSlugs: [],
    focusOnHover: true,
    enableRadial: true
  }
};
var Graph_default = ((userOpts) => {
  let cachedBaseEmbeds;
  let cachedForFiles;
  const Graph = ({
    displayClass,
    cfg,
    allFiles,
    ctx
  }) => {
    const localGraph = { ...defaultOptions.localGraph, ...userOpts?.localGraph };
    const globalGraph = { ...defaultOptions.globalGraph, ...userOpts?.globalGraph };
    const contentDir = ctx?.argv?.directory;
    if (contentDir && cachedForFiles !== allFiles) {
      const withSlug = allFiles.filter(
        (file) => typeof file.slug === "string"
      );
      cachedBaseEmbeds = findBaseEmbedEdges(withSlug, contentDir);
      cachedForFiles = allFiles;
    }
    const baseEmbeds = cachedBaseEmbeds ?? [];
    return /* @__PURE__ */ u2("div", { class: classNames(displayClass, "graph"), children: [
      /* @__PURE__ */ u2("h3", { children: i18n(cfg.locale ?? "en-US").components.graph.title }),
      /* @__PURE__ */ u2("div", { class: "graph-outer", children: [
        /* @__PURE__ */ u2(
          "div",
          {
            class: "graph-container",
            "data-cfg": JSON.stringify({ ...localGraph, baseEmbeds })
          }
        ),
        /* @__PURE__ */ u2("button", { class: "global-graph-icon", "aria-label": "Global Graph", children: /* @__PURE__ */ u2(
          "svg",
          {
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            x: "0px",
            y: "0px",
            viewBox: "0 0 55 55",
            fill: "currentColor",
            xmlSpace: "preserve",
            children: /* @__PURE__ */ u2(
              "path",
              {
                d: "M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17\n                s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4\n                c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562\n                C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829\n                c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91\n                v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4\n                s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665\n                C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z M11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2\n                S11,10.103,11,9z M6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51z M33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4\n                s1.794-4,4-4S33,46.794,33,49z M29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31z M47,41c0,1.103-0.897,2-2,2\n                s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41z M49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z"
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ u2("div", { class: "global-graph-outer", children: /* @__PURE__ */ u2(
        "div",
        {
          class: "global-graph-container",
          "data-cfg": JSON.stringify({ ...globalGraph, baseEmbeds })
        }
      ) })
    ] });
  };
  Graph.css = graph_default;
  Graph.afterDOMLoaded = graph_inline_default;
  return Graph;
});

export { Graph_default as Graph };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map