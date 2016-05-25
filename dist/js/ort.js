/*
 * Accessifyhtml5.js
 *
 * Source: https://github.com/yatil/accessifyhtml5.js
 */

var AccessifyHTML5=function(e,f){var c={article:{role:"article"},aside:{role:"complementary"},nav:{role:"navigation"},main:{role:"main"},output:{"aria-live":"polite"},section:{role:"region"},"[required]":{"aria-required":"true"}},g={ok:[],warn:[],fail:[]},k=g.fail,b,h,a,d,n,p,l,r,m,s=RegExp("aria-[a-z]+|role|tabindex|title|alt|data-[\\w-]+|lang|style|maxlength|placeholder|pattern|required|type|target|accesskey|longdesc"),t=0,q=document;if(q.querySelectorAll){e&&(e.header&&(c[e.header]={role:"banner"}),
e.footer&&(c[e.footer]={role:"contentinfo"}),e.main&&(c[e.main]={role:"main"},c.main={role:""}));if(f&&f._CONFIG_&&f._CONFIG_.ignore_defaults)c=f;else for(a in f)c[a]=f[a];for(b in c)if(!b.match(/^_(CONFIG|[A-Z]+)_/)&&c.hasOwnProperty(b)){try{h=q.querySelectorAll(b)}catch(u){k.push({sel:b,attr:null,val:null,msg:"Invalid syntax for `document.querySelectorAll` function",ex:u})}p=c[b];(!h||1>h.length)&&g.warn.push({sel:b,attr:null,val:null,msg:"Not found"});for(l=0;l<h.length;l++)for(n in p)if(p.hasOwnProperty(n)&&
(a=n,d=p[n],!a.match(/_?note/)))if(a.match(s))if((typeof d).match(/string|number|boolean/)){if(r=a.match(/(describ|label)l?edby/)){try{m=q.querySelector(d)}catch(v){k.push({sel:b,attr:a,val:d,msg:"Invalid selector syntax (2) - see 'val'",ex:v})}if(!m){k.push({sel:b,attr:a,val:d,msg:"Labelledby ref not found - see 'val'"});continue}m.id||(m.id="acfy-id-"+t);d=m.id;a="aria-"+("label"===r[1]?"labelledby":"describedby");t++}h[l].hasAttribute(a)?g.warn.push({sel:b,attr:a,val:d,msg:"Already present, skipped"}):
(h[l].setAttribute(a,d),g.ok.push({sel:b,attr:a,val:d,msg:"Added"}))}else k.push({sel:b,attr:a,val:d,msg:"Value-type not allowed"});else k.push({sel:b,attr:a,val:null,msg:"Attribute not allowed",re:s})}}g.input=c;return g};;
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map;
/*
 AngularJS v1.4.3
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(O,U,t){'use strict';function J(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.4.3/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ea(b){if(null==b||Wa(b))return!1;var a="length"in Object(b)&&b.length;
return b.nodeType===qa&&a?!0:L(b)||G(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function m(b,a,c){var d,e;if(b)if(z(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(G(b)||Ea(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==m)b.forEach(a,c,b);else if(nc(b))for(d in b)a.call(c,b[d],d,b);else if("function"===typeof b.hasOwnProperty)for(d in b)b.hasOwnProperty(d)&&
a.call(c,b[d],d,b);else for(d in b)Xa.call(b,d)&&a.call(c,b[d],d,b);return b}function oc(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function pc(b){return function(a,c){b(c,a)}}function Ud(){return++nb}function qc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function Nb(b,a,c){for(var d=b.$$hashKey,e=0,f=a.length;e<f;++e){var g=a[e];if(H(g)||z(g))for(var h=Object.keys(g),l=0,k=h.length;l<k;l++){var n=h[l],r=g[n];c&&H(r)?aa(r)?b[n]=new Date(r.valueOf()):(H(b[n])||
(b[n]=G(r)?[]:{}),Nb(b[n],[r],!0)):b[n]=r}}qc(b,d);return b}function P(b){return Nb(b,za.call(arguments,1),!1)}function Vd(b){return Nb(b,za.call(arguments,1),!0)}function W(b){return parseInt(b,10)}function Ob(b,a){return P(Object.create(b),a)}function v(){}function Ya(b){return b}function ra(b){return function(){return b}}function rc(b){return z(b.toString)&&b.toString!==Object.prototype.toString}function A(b){return"undefined"===typeof b}function w(b){return"undefined"!==typeof b}function H(b){return null!==
b&&"object"===typeof b}function nc(b){return null!==b&&"object"===typeof b&&!sc(b)}function L(b){return"string"===typeof b}function V(b){return"number"===typeof b}function aa(b){return"[object Date]"===sa.call(b)}function z(b){return"function"===typeof b}function Za(b){return"[object RegExp]"===sa.call(b)}function Wa(b){return b&&b.window===b}function $a(b){return b&&b.$evalAsync&&b.$watch}function ab(b){return"boolean"===typeof b}function tc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}
function Wd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ta(b){return M(b.nodeName||b[0]&&b[0].nodeName)}function bb(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return c}function fa(b,a,c,d){if(Wa(b)||$a(b))throw Fa("cpws");if(uc.test(sa.call(a)))throw Fa("cpta");if(a){if(b===a)throw Fa("cpi");c=c||[];d=d||[];H(b)&&(c.push(b),d.push(a));var e;if(G(b))for(e=a.length=0;e<b.length;e++)a.push(fa(b[e],null,c,d));else{var f=a.$$hashKey;G(a)?a.length=0:m(a,function(b,
c){delete a[c]});if(nc(b))for(e in b)a[e]=fa(b[e],null,c,d);else if(b&&"function"===typeof b.hasOwnProperty)for(e in b)b.hasOwnProperty(e)&&(a[e]=fa(b[e],null,c,d));else for(e in b)Xa.call(b,e)&&(a[e]=fa(b[e],null,c,d));qc(a,f)}}else if(a=b,H(b)){if(c&&-1!==(f=c.indexOf(b)))return d[f];if(G(b))return fa(b,[],c,d);if(uc.test(sa.call(b)))a=new b.constructor(b);else if(aa(b))a=new Date(b.getTime());else if(Za(b))a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex;else return e=
Object.create(sc(b)),fa(b,e,c,d);d&&(c.push(b),d.push(a))}return a}function ia(b,a){if(G(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(H(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ka(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(G(b)){if(!G(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ka(b[d],a[d]))return!1;return!0}}else{if(aa(b))return aa(a)?
ka(b.getTime(),a.getTime()):!1;if(Za(b))return Za(a)?b.toString()==a.toString():!1;if($a(b)||$a(a)||Wa(b)||Wa(a)||G(a)||aa(a)||Za(a))return!1;c=ga();for(d in b)if("$"!==d.charAt(0)&&!z(b[d])){if(!ka(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!(d in c||"$"===d.charAt(0)||a[d]===t||z(a[d])))return!1;return!0}return!1}function cb(b,a,c){return b.concat(za.call(a,c))}function vc(b,a){var c=2<arguments.length?za.call(arguments,2):[];return!z(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?
a.apply(b,cb(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Xd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Wa(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":$a(a)&&(c="$SCOPE");return c}function db(b,a){if("undefined"===typeof b)return t;V(a)||(a=a?2:null);return JSON.stringify(b,Xd,a)}function wc(b){return L(b)?JSON.parse(b):b}function xc(b,a){var c=Date.parse("Jan 01, 1970 00:00:00 "+b)/6E4;return isNaN(c)?a:c}function Pb(b,
a,c){c=c?-1:1;var d=xc(a,b.getTimezoneOffset());a=b;b=c*(d-b.getTimezoneOffset());a=new Date(a.getTime());a.setMinutes(a.getMinutes()+b);return a}function ua(b){b=y(b).clone();try{b.empty()}catch(a){}var c=y("<div>").append(b).html();try{return b[0].nodeType===Na?M(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+M(b)})}catch(d){return M(c)}}function yc(b){try{return decodeURIComponent(b)}catch(a){}}function zc(b){var a={},c,d;m((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,
"%20").split("="),d=yc(c[0]),w(d)&&(b=w(c[1])?yc(c[1]):!0,Xa.call(a,d)?G(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Qb(b){var a=[];m(b,function(b,d){G(b)?m(b,function(b){a.push(ma(d,!0)+(!0===b?"":"="+ma(b,!0)))}):a.push(ma(d,!0)+(!0===b?"":"="+ma(b,!0)))});return a.length?a.join("&"):""}function ob(b){return ma(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ma(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,
"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Yd(b,a){var c,d,e=Oa.length;for(d=0;d<e;++d)if(c=Oa[d]+a,L(c=b.getAttribute(c)))return c;return null}function Zd(b,a){var c,d,e={};m(Oa,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});m(Oa,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Yd(c,"strict-di"),a(c,d?[d]:[],e))}function Ac(b,a,c){H(c)||
(c={});c=P({strictDi:!1},c);var d=function(){b=y(b);if(b.injector()){var d=b[0]===U?"document":ua(b);throw Fa("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=eb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},e=
/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;O&&e.test(O.name)&&(c.debugInfoEnabled=!0,O.name=O.name.replace(e,""));if(O&&!f.test(O.name))return d();O.name=O.name.replace(f,"");ca.resumeBootstrap=function(b){m(b,function(b){a.push(b)});return d()};z(ca.resumeDeferredBootstrap)&&ca.resumeDeferredBootstrap()}function $d(){O.name="NG_ENABLE_DEBUG_INFO!"+O.name;O.location.reload()}function ae(b){b=ca.element(b).injector();if(!b)throw Fa("test");return b.get("$$testability")}function Bc(b,a){a=a||
"_";return b.replace(be,function(b,d){return(d?a:"")+b.toLowerCase()})}function ce(){var b;if(!Cc){var a=pb();la=O.jQuery;w(a)&&(la=null===a?t:O[a]);la&&la.fn.on?(y=la,P(la.fn,{scope:Pa.scope,isolateScope:Pa.isolateScope,controller:Pa.controller,injector:Pa.injector,inheritedData:Pa.inheritedData}),b=la.cleanData,la.cleanData=function(a){var d;if(Rb)Rb=!1;else for(var e=0,f;null!=(f=a[e]);e++)(d=la._data(f,"events"))&&d.$destroy&&la(f).triggerHandler("$destroy");b(a)}):y=Q;ca.element=y;Cc=!0}}function Sb(b,
a,c){if(!b)throw Fa("areq",a||"?",c||"required");return b}function Qa(b,a,c){c&&G(b)&&(b=b[b.length-1]);Sb(z(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ra(b,a){if("hasOwnProperty"===b)throw Fa("badname",a);}function Dc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&z(b)?vc(e,b):b}function qb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==
b);return y(c)}function ga(){return Object.create(null)}function de(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=J("$injector"),d=J("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||J;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(b,c,e,f){f||(f=d);return function(){f[e||"push"]([b,c,arguments]);return C}}function b(a,c){return function(b,e){e&&z(e)&&
(e.$$moduleName=f);d.push([a,c,arguments]);return C}}if(!g)throw c("nomod",f);var d=[],e=[],s=[],x=a("$injector","invoke","push",e),C={_invokeQueue:d,_configBlocks:e,_runBlocks:s,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider",
"register"),directive:b("$compileProvider","directive"),config:x,run:function(a){s.push(a);return this}};h&&x(h);return C})}})}function ee(b){P(b,{bootstrap:Ac,copy:fa,extend:P,merge:Vd,equals:ka,element:y,forEach:m,injector:eb,noop:v,bind:vc,toJson:db,fromJson:wc,identity:Ya,isUndefined:A,isDefined:w,isString:L,isFunction:z,isObject:H,isNumber:V,isElement:tc,isArray:G,version:fe,isDate:aa,lowercase:M,uppercase:rb,callbacks:{counter:0},getTestability:ae,$$minErr:J,$$csp:fb,reloadWithDebugInfo:$d});
gb=de(O);try{gb("ngLocale")}catch(a){gb("ngLocale",[]).provider("$locale",ge)}gb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:he});a.provider("$compile",Ec).directive({a:ie,input:Fc,textarea:Fc,form:je,script:ke,select:le,style:me,option:ne,ngBind:oe,ngBindHtml:pe,ngBindTemplate:qe,ngClass:re,ngClassEven:se,ngClassOdd:te,ngCloak:ue,ngController:ve,ngForm:we,ngHide:xe,ngIf:ye,ngInclude:ze,ngInit:Ae,ngNonBindable:Be,ngPluralize:Ce,ngRepeat:De,ngShow:Ee,ngStyle:Fe,ngSwitch:Ge,
ngSwitchWhen:He,ngSwitchDefault:Ie,ngOptions:Je,ngTransclude:Ke,ngModel:Le,ngList:Me,ngChange:Ne,pattern:Gc,ngPattern:Gc,required:Hc,ngRequired:Hc,minlength:Ic,ngMinlength:Ic,maxlength:Jc,ngMaxlength:Jc,ngValue:Oe,ngModelOptions:Pe}).directive({ngInclude:Qe}).directive(sb).directive(Kc);a.provider({$anchorScroll:Re,$animate:Se,$$animateQueue:Te,$$AnimateRunner:Ue,$browser:Ve,$cacheFactory:We,$controller:Xe,$document:Ye,$exceptionHandler:Ze,$filter:Lc,$interpolate:$e,$interval:af,$http:bf,$httpParamSerializer:cf,
$httpParamSerializerJQLike:df,$httpBackend:ef,$location:ff,$log:gf,$parse:hf,$rootScope:jf,$q:kf,$$q:lf,$sce:mf,$sceDelegate:nf,$sniffer:of,$templateCache:pf,$templateRequest:qf,$$testability:rf,$timeout:sf,$window:tf,$$rAF:uf,$$jqLite:vf,$$HashMap:wf,$$cookieReader:xf})}])}function hb(b){return b.replace(yf,function(a,b,d,e){return e?d.toUpperCase():d}).replace(zf,"Moz$1")}function Mc(b){b=b.nodeType;return b===qa||!b||9===b}function Nc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Tb.test(b)){c=
c||e.appendChild(a.createElement("div"));d=(Af.exec(b)||["",""])[1].toLowerCase();d=na[d]||na._default;c.innerHTML=d[1]+b.replace(Bf,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=cb(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";m(f,function(a){e.appendChild(a)});return e}function Q(b){if(b instanceof Q)return b;var a;L(b)&&(b=R(b),a=!0);if(!(this instanceof Q)){if(a&&"<"!=b.charAt(0))throw Ub("nosel");return new Q(b)}if(a){a=U;
var c;b=(c=Cf.exec(b))?[a.createElement(c[1])]:(c=Nc(b,a))?c.childNodes:[]}Oc(this,b)}function Vb(b){return b.cloneNode(!0)}function tb(b,a){a||ub(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)ub(c[d])}function Pc(b,a,c,d){if(w(d))throw Ub("offargs");var e=(d=vb(b))&&d.events,f=d&&d.handle;if(f)if(a)m(a.split(" "),function(a){if(w(c)){var d=e[a];bb(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,
f,!1),delete e[a]}function ub(b,a){var c=b.ng339,d=c&&ib[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Pc(b)),delete ib[c],b.ng339=t))}function vb(b,a){var c=b.ng339,c=c&&ib[c];a&&!c&&(b.ng339=c=++Df,c=ib[c]={events:{},data:{},handle:t});return c}function Wb(b,a,c){if(Mc(b)){var d=w(c),e=!d&&a&&!H(a),f=!a;b=(b=vb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];P(b,a)}}}function wb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+
" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function xb(b,a){a&&b.setAttribute&&m(a.split(" "),function(a){b.setAttribute("class",R((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+R(a)+" "," ")))})}function yb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");m(a.split(" "),function(a){a=R(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",R(c))}}function Oc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=
a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Qc(b,a){return zb(b,"$"+(a||"ngController")+"Controller")}function zb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=G(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=y.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Rc(b){for(tb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Xb(b,a){a||tb(b);var c=b.parentNode;c&&c.removeChild(b)}function Ef(b,
a){a=a||O;if("complete"===a.document.readyState)a.setTimeout(b);else y(a).on("load",b)}function Sc(b,a){var c=Ab[a.toLowerCase()];return c&&Tc[ta(b)]&&c}function Ff(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Uc[a]}function Gf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(A(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=
!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=ia(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function vf(){this.$get=function(){return P(Q,{hasClass:function(b,a){b.attr&&(b=b[0]);return wb(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return yb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return xb(b,a)}})}}function Ga(b,a){var c=b&&b.$$hashKey;
if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Ud)():c+":"+b}function Sa(b,a){if(a){var c=0;this.nextUid=function(){return++c}}m(b,this.put,this)}function Hf(b){return(b=b.toString().replace(Vc,"").match(Wc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function eb(b,a){function c(a){return function(b,c){if(H(b))m(b,pc(a));else return a(b,c)}}function d(a,b){Ra(a,"service");if(z(b)||G(b))b=s.instantiate(b);
if(!b.$get)throw Ha("pget",a);return r[a+"Provider"]=b}function e(a,b){return function(){var c=C.invoke(b,this);if(A(c))throw Ha("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;m(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=s.get(e[0]);f[e[1]].apply(f,e[2])}}if(!n.get(a)){n.put(a,!0);try{L(a)?(c=gb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):z(a)?b.push(s.invoke(a)):G(a)?
b.push(s.invoke(a)):Qa(a,"module")}catch(e){throw G(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ha("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Ha("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=eb.$$annotate(b,
a,g),l,s,n;s=0;for(l=k.length;s<l;s++){n=k[s];if("string"!==typeof n)throw Ha("itkn",n);h.push(f&&f.hasOwnProperty(n)?f[n]:d(n,g))}G(b)&&(b=b[l]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((G(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return H(a)||z(a)?a:d},get:d,annotate:eb.$$annotate,has:function(a){return r.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],n=new Sa([],!0),r={$provide:{provider:c(d),factory:c(f),service:c(function(a,
b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,ra(b),!1)}),constant:c(function(a,b){Ra(a,"constant");r[a]=b;x[a]=b}),decorator:function(a,b){var c=s.get(a+"Provider"),d=c.$get;c.$get=function(){var a=C.invoke(d,c);return C.invoke(b,null,{$delegate:a})}}}},s=r.$injector=h(r,function(a,b){ca.isString(b)&&k.push(b);throw Ha("unpr",k.join(" <- "));}),x={},C=x.$injector=h(x,function(a,b){var c=s.get(a+"Provider",b);return C.invoke(c.$get,c,t,a)});m(g(b),
function(a){a&&C.invoke(a)});return C}function Re(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ta(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;z(c)?c=c():tc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):V(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,
0)}function g(a){a=L(a)?a:c.hash();var b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||Ef(function(){d.$evalAsync(g)})});return g}]}function jb(b,a){if(!b&&!a)return"";if(!b)return a;if(!a)return b;G(b)&&(b=b.join(" "));G(a)&&(a=a.join(" "));return b+" "+a}function If(b){L(b)&&(b=b.split(" "));var a=ga();m(b,function(b){b.length&&(a[b]=!0)});return a}function Ia(b){return H(b)?
b:{}}function Jf(b,a,c,d){function e(a){try{a.apply(null,za.call(arguments,1))}finally{if(C--,0===C)for(;F.length;)try{F.pop()()}catch(b){c.error(b)}}}function f(){g();h()}function g(){a:{try{u=n.state;break a}catch(a){}u=void 0}u=A(u)?null:u;ka(u,D)&&(u=D);D=u}function h(){if(K!==l.url()||p!==u)K=l.url(),p=u,m(B,function(a){a(l.url(),u)})}var l=this,k=b.location,n=b.history,r=b.setTimeout,s=b.clearTimeout,x={};l.isMock=!1;var C=0,F=[];l.$$completeOutstandingRequest=e;l.$$incOutstandingRequestCount=
function(){C++};l.notifyWhenNoOutstandingRequests=function(a){0===C?a():F.push(a)};var u,p,K=k.href,q=a.find("base"),I=null;g();p=u;l.url=function(a,c,e){A(e)&&(e=null);k!==b.location&&(k=b.location);n!==b.history&&(n=b.history);if(a){var f=p===e;if(K===a&&(!d.history||f))return l;var h=K&&Ja(K)===Ja(a);K=a;p=e;if(!d.history||h&&f){if(!h||I)I=a;c?k.replace(a):h?(c=k,e=a.indexOf("#"),a=-1===e?"":a.substr(e),c.hash=a):k.href=a}else n[c?"replaceState":"pushState"](e,"",a),g(),p=u;return l}return I||
k.href.replace(/%27/g,"'")};l.state=function(){return u};var B=[],N=!1,D=null;l.onUrlChange=function(a){if(!N){if(d.history)y(b).on("popstate",f);y(b).on("hashchange",f);N=!0}B.push(a);return a};l.$$applicationDestroyed=function(){y(b).off("hashchange popstate",f)};l.$$checkUrlChange=h;l.baseHref=function(){var a=q.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};l.defer=function(a,b){var c;C++;c=r(function(){delete x[c];e(a)},b||0);x[c]=!0;return c};l.defer.cancel=function(a){return x[a]?
(delete x[a],s(a),e(v),!0):!1}}function Ve(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new Jf(b,d,a,c)}]}function We(){this.$get=function(){function b(b,d){function e(a){a!=r&&(s?s==a&&(s=a.n):s=a,f(a.n,a.p),f(a,r),r=a,r.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw J("$cacheFactory")("iid",b);var g=0,h=P({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,n={},r=null,s=null;return a[b]={put:function(a,b){if(!A(b)){if(k<Number.MAX_VALUE){var c=
n[a]||(n[a]={key:a});e(c)}a in l||g++;l[a]=b;g>k&&this.remove(s.key);return b}},get:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;b==r&&(r=b.p);b==s&&(s=b.n);f(b.n,b.p);delete n[a]}delete l[a];g--},removeAll:function(){l={};g=0;n={};r=s=null},destroy:function(){n=h=l=null;delete a[b]},info:function(){return P({},h,{size:g})}}}var a={};b.info=function(){var b={};m(a,function(a,e){b[e]=a.info()});return b};
b.get=function(b){return a[b]};return b}}function pf(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function Ec(b,a){function c(a,b,c){var d=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,e={};m(a,function(a,f){var g=a.match(d);if(!g)throw ea("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f}});return e}function d(a){var b=a.charAt(0);if(!b||b!==M(b))throw ea("baddir",a);if(a!==a.trim())throw ea("baddir",
a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=Wd("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function s(a,f){Ra(a,"directive");L(a)?(d(a),Sb(f,"directiveFactory"),e.hasOwnProperty(a)||(e[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,d){var f=[];m(e[a],function(e,g){try{var h=b.invoke(e);z(h)?h={compile:ra(h)}:!h.compile&&h.link&&(h.compile=ra(h.link));h.priority=h.priority||
0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";var k=h,l=h,s=h.name,n={isolateScope:null,bindToController:null};H(l.scope)&&(!0===l.bindToController?(n.bindToController=c(l.scope,s,!0),n.isolateScope={}):n.isolateScope=c(l.scope,s,!1));H(l.bindToController)&&(n.bindToController=c(l.bindToController,s,!0));if(H(n.bindToController)){var C=l.controller,$=l.controllerAs;if(!C)throw ea("noctrl",s);var ha;a:if($&&L($))ha=$;else{if(L(C)){var m=Xc.exec(C);
if(m){ha=m[3];break a}}ha=void 0}if(!ha)throw ea("noident",s);}var q=k.$$bindings=n;H(q.isolateScope)&&(h.$$isolateBindings=q.isolateScope);h.$$moduleName=e.$$moduleName;f.push(h)}catch(t){d(t)}});return f}])),e[a].push(f)):m(a,pc(s));return this};this.aHrefSanitizationWhitelist=function(b){return w(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return w(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};
var n=!0;this.debugInfoEnabled=function(a){return w(a)?(n=a,this):n};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,d,u,p,K,q,I,B,N){function D(a,b){try{a.addClass(b)}catch(c){}}function Z(a,b,c,d,e){a instanceof y||(a=y(a));m(a,function(b,c){b.nodeType==Na&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);Z.$$addScopeClass(a);
var g=null;return function(b,c,d){Sb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ta(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?y(Yb(g,y("<div>").append(a).html())):c?Pa.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);Z.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,
c,d,e){var f,k,l,s,n,B,C;if(p)for(C=Array(c.length),s=0;s<h.length;s+=3)f=h[s],C[f]=c[f];else C=c;s=0;for(n=h.length;s<n;)if(k=C[h[s++]],c=h[s++],f=h[s++],c){if(c.scope){if(l=a.$new(),Z.$$addScopeInfo(y(k),l),B=c.$$destroyBindings)c.$$destroyBindings=null,l.$on("$destroyed",B)}else l=a;B=c.transcludeOnThisElement?$(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?$(a,b):null;c(f,l,k,d,B,c)}else f&&f(a,k.childNodes,t,e)}for(var h=[],k,l,s,n,p,B=0;B<a.length;B++){k=new aa;l=ha(a[B],[],k,0===B?
d:t,e);(f=l.length?E(l,a[B],k,b,c,null,[],[],f):null)&&f.scope&&Z.$$addScopeClass(k.$$element);k=f&&f.terminal||!(s=a[B].childNodes)||!s.length?null:S(s,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(B,f,k),n=!0,p=p||f;f=null}return n?g:null}function $(a,b,c){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function ha(a,b,c,d,e){var h=c.$attr,k;switch(a.nodeType){case qa:w(b,
wa(ta(a)),"E",d,e);for(var l,s,n,p=a.attributes,B=0,C=p&&p.length;B<C;B++){var x=!1,S=!1;l=p[B];k=l.name;s=R(l.value);l=wa(k);if(n=ia.test(l))k=k.replace(Zc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var F=l.replace(/(Start|End)$/,"");A(F)&&l===F+"Start"&&(x=k,S=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=wa(k.toLowerCase());h[l]=k;if(n||!c.hasOwnProperty(l))c[l]=s,Sc(a,l)&&(c[l]=!0);V(a,b,s,l,n);w(b,l,"A",d,e,x,S)}a=a.className;H(a)&&(a=a.animVal);if(L(a)&&
""!==a)for(;k=g.exec(a);)l=wa(k[2]),w(b,l,"C",d,e)&&(c[l]=R(k[3])),a=a.substr(k.index+k[0].length);break;case Na:if(11===Ua)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===Na;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);xa(b,a.nodeValue);break;case 8:try{if(k=f.exec(a.nodeValue))l=wa(k[1]),w(b,l,"M",d,e)&&(c[l]=R(k[2]))}catch($){}}b.sort(Aa);return b}function va(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ea("uterdir",b,c);
a.nodeType==qa&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function Yc(a,b,c){return function(d,e,f,g,h){e=va(e[0],b,c);return a(d,e,f,g,h)}}function E(a,b,d,e,f,g,h,k,s){function n(a,b,c,d){if(a){c&&(a=Yc(a,c,d));a.require=E.require;a.directiveName=w;if(u===E||E.$$isolateScope)a=X(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Yc(b,c,d));b.require=E.require;b.directiveName=w;if(u===E||E.$$isolateScope)b=X(b,{isolateScope:!0});k.push(b)}}
function B(a,b,c,d){var e;if(L(b)){var f=b.match(l);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;e||(d="$"+b+"Controller",e=g?c.inheritedData(d):c.data(d));if(!e&&!f)throw ea("ctreq",b,a);}else if(G(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=B(a,b[g],c,d);return e||null}function x(a,b,c,d,e,f){var g=ga(),h;for(h in d){var k=d[h],l={$scope:k===u||k.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},s=k.controller;"@"==s&&(s=b[k.name]);l=p(s,
l,!0,k.controllerAs);g[k.name]=l;q||a.data("$"+k.name+"Controller",l.instance)}return g}function S(a,c,e,f,g,l){function s(a,b,c){var d;$a(a)||(c=b,b=a,a=t);q&&(d=m);c||(c=q?ja.parent():ja);return g(a,b,d,c,va)}var n,p,C,F,m,ha,ja;b===e?(f=d,ja=d.$$element):(ja=y(e),f=new aa(ja,d));u&&(F=c.$new(!0));g&&(ha=s,ha.$$boundTransclude=g);N&&(m=x(ja,f,ha,N,F,c));u&&(Z.$$addScopeInfo(ja,F,!0,!(D&&(D===u||D===u.$$originalDirective))),Z.$$addScopeClass(ja,!0),F.$$isolateBindings=u.$$isolateBindings,W(c,f,F,
F.$$isolateBindings,u,F));if(m){var K=u||$,I;K&&m[K.name]&&(p=K.$$bindings.bindToController,(C=m[K.name])&&C.identifier&&p&&(I=C,l.$$destroyBindings=W(c,f,C.instance,p,K)));for(n in m){C=m[n];var E=C();E!==C.instance&&(C.instance=E,ja.data("$"+n+"Controller",E),C===I&&(l.$$destroyBindings(),l.$$destroyBindings=W(c,f,E,p,K)))}}n=0;for(l=h.length;n<l;n++)p=h[n],Y(p,p.isolateScope?F:c,ja,f,p.require&&B(p.directiveName,p.require,ja,m),ha);var va=c;u&&(u.template||null===u.templateUrl)&&(va=F);a&&a(va,
e.childNodes,t,g);for(n=k.length-1;0<=n;n--)p=k[n],Y(p,p.isolateScope?F:c,ja,f,p.require&&B(p.directiveName,p.require,ja,m),ha)}s=s||{};for(var F=-Number.MAX_VALUE,$=s.newScopeDirective,N=s.controllerDirectives,u=s.newIsolateScopeDirective,D=s.templateDirective,m=s.nonTlbTranscludeDirective,K=!1,I=!1,q=s.hasElementTranscludeDirective,ba=d.$$element=y(b),E,w,v,A=e,Aa,xa=0,Ta=a.length;xa<Ta;xa++){E=a[xa];var M=E.$$start,P=E.$$end;M&&(ba=va(b,M,P));v=t;if(F>E.priority)break;if(v=E.scope)E.templateUrl||
(H(v)?(O("new/isolated scope",u||$,E,ba),u=E):O("new/isolated scope",u,E,ba)),$=$||E;w=E.name;!E.templateUrl&&E.controller&&(v=E.controller,N=N||ga(),O("'"+w+"' controller",N[w],E,ba),N[w]=E);if(v=E.transclude)K=!0,E.$$tlb||(O("transclusion",m,E,ba),m=E),"element"==v?(q=!0,F=E.priority,v=ba,ba=d.$$element=y(U.createComment(" "+w+": "+d[w]+" ")),b=ba[0],T(f,za.call(v,0),b),A=Z(v,e,F,g&&g.name,{nonTlbTranscludeDirective:m})):(v=y(Vb(b)).contents(),ba.empty(),A=Z(v,e));if(E.template)if(I=!0,O("template",
D,E,ba),D=E,v=z(E.template)?E.template(ba,d):E.template,v=fa(v),E.replace){g=E;v=Tb.test(v)?$c(Yb(E.templateNamespace,R(v))):[];b=v[0];if(1!=v.length||b.nodeType!==qa)throw ea("tplrt",w,"");T(f,ba,b);Ta={$attr:{}};v=ha(b,[],Ta);var Q=a.splice(xa+1,a.length-(xa+1));u&&ad(v);a=a.concat(v).concat(Q);J(d,Ta);Ta=a.length}else ba.html(v);if(E.templateUrl)I=!0,O("template",D,E,ba),D=E,E.replace&&(g=E),S=Lf(a.splice(xa,a.length-xa),ba,d,f,K&&A,h,k,{controllerDirectives:N,newScopeDirective:$!==E&&$,newIsolateScopeDirective:u,
templateDirective:D,nonTlbTranscludeDirective:m}),Ta=a.length;else if(E.compile)try{Aa=E.compile(ba,d,A),z(Aa)?n(null,Aa,M,P):Aa&&n(Aa.pre,Aa.post,M,P)}catch(Kf){c(Kf,ua(ba))}E.terminal&&(S.terminal=!0,F=Math.max(F,E.priority))}S.scope=$&&!0===$.scope;S.transcludeOnThisElement=K;S.templateOnThisElement=I;S.transclude=A;s.hasElementTranscludeDirective=q;return S}function ad(a){for(var b=0,c=a.length;b<c;b++)a[b]=Ob(a[b],{$$isolateScope:!0})}function w(b,d,f,g,h,k,l){if(d===h)return null;h=null;if(e.hasOwnProperty(d)){var n;
d=a.get(d+"Directive");for(var p=0,B=d.length;p<B;p++)try{n=d[p],(g===t||g>n.priority)&&-1!=n.restrict.indexOf(f)&&(k&&(n=Ob(n,{$$start:k,$$end:l})),b.push(n),h=n)}catch(x){c(x)}}return h}function A(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=c[d],b.multiElement)return!0;return!1}function J(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;m(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});m(b,function(b,f){"class"==
f?(D(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function Lf(a,b,c,e,f,g,h,k){var l=[],s,n,p=b[0],B=a.shift(),C=Ob(B,{templateUrl:null,transclude:null,replace:null,$$originalDirective:B}),x=z(B.templateUrl)?B.templateUrl(b,c):B.templateUrl,N=B.templateNamespace;b.empty();d(x).then(function(d){var F,u;d=fa(d);if(B.replace){d=Tb.test(d)?$c(Yb(N,R(d))):
[];F=d[0];if(1!=d.length||F.nodeType!==qa)throw ea("tplrt",B.name,x);d={$attr:{}};T(e,b,F);var K=ha(F,[],d);H(B.scope)&&ad(K);a=K.concat(a);J(c,d)}else F=p,b.html(d);a.unshift(C);s=E(a,F,c,f,b,B,g,h,k);m(e,function(a,c){a==F&&(e[c]=b[0])});for(n=S(b[0].childNodes,f);l.length;){d=l.shift();u=l.shift();var I=l.shift(),va=l.shift(),K=b[0];if(!d.$$destroyed){if(u!==p){var Z=u.className;k.hasElementTranscludeDirective&&B.replace||(K=Vb(F));T(I,y(u),K);D(y(K),Z)}u=s.transcludeOnThisElement?$(d,s.transclude,
va):va;s(n,d,K,e,u,s)}}l=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(s.transcludeOnThisElement&&(a=$(b,s.transclude,e)),s(n,b,c,d,a,s)))}}function Aa(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function O(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw ea("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,ua(d));}function xa(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=
a.parent();var b=!!a.length;b&&Z.$$addBindingClass(a);return function(a,c){var e=c.parent();b||Z.$$addBindingClass(e);Z.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Yb(a,b){a=M(a||"html");switch(a){case "svg":case "math":var c=U.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Q(a,b){if("srcdoc"==b)return I.HTML;var c=ta(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||
"ngSrc"==b))return I.RESOURCE_URL}function V(a,c,d,e,f){var g=Q(a,e);f=h[e]||f;var l=b(d,!0,g,f);if(l){if("multiple"===e&&"select"===ta(a))throw ea("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers={});if(k.test(e))throw ea("nodomevents");var s=h[e];s!==d&&(l=s&&b(s,!0,g,f),d=s);l&&(h[e]=l(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(l,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,
a)}))}}}})}}function T(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);y.hasData(d)&&(y(c).data(y(d).data()),la?(Rb=!0,la.cleanData([d])):delete y.cache[d[y.expando]]);d=1;for(e=b.length;d<e;d++)f=b[d],y(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function X(a,
b){return P(function(){return a.apply(null,arguments)},a,b)}function Y(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}function W(a,c,d,e,f,g){var h;m(e,function(e,g){var k=e.attrName,l=e.optional,s=e.mode,n,p,B,C;Xa.call(c,k)||(c[k]=t);switch(s){case "@":c[k]||l||(d[g]=t);c.$observe(k,function(a){d[g]=a});c.$$observers[k].$$scope=a;c[k]&&(d[g]=b(c[k])(a));break;case "=":if(l&&!c[k])break;p=u(c[k]);C=p.literal?ka:function(a,b){return a===b||a!==a&&b!==b};B=p.assign||function(){n=d[g]=p(a);throw ea("nonassign",
c[k],f.name);};n=d[g]=p(a);l=function(b){C(b,d[g])||(C(b,n)?B(a,b=d[g]):d[g]=b);return n=b};l.$stateful=!0;l=e.collection?a.$watchCollection(c[k],l):a.$watch(u(c[k],l),null,p.literal);h=h||[];h.push(l);break;case "&":p=u(c[k]);if(p===v&&l)break;d[g]=function(b){return p(a,b)}}});e=h?function(){for(var a=0,b=h.length;a<b;++a)h[a]()}:v;return g&&e!==v?(g.$on("$destroy",e),v):e}var aa=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=
a};aa.prototype={$normalize:wa,$addClass:function(a){a&&0<a.length&&B.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&B.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=bd(a,b);c&&c.length&&B.addClass(this.$$element,c);(c=bd(b,a))&&c.length&&B.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Sc(f,a),h=Ff(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Bc(a,
"-"));g=ta(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=N(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=R(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var s=2*l,g=g+N(R(h[s]),!0),g=g+(" "+R(h[s+1]));h=R(h[2*l]).split(/\s/);g+=N(R(h[0]),!0);2===h.length&&(g+=" "+R(h[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&m(a[f],
function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ga()),e=d[a]||(d[a]=[]);e.push(b);K.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){bb(e,b)}}};var ca=b.startSymbol(),da=b.endSymbol(),fa="{{"==ca||"}}"==da?Ya:function(a){return a.replace(/\{\{/g,ca).replace(/}}/g,da)},ia=/^ngAttr[A-Z]/;Z.$$addBindingInfo=n?function(a,b){var c=a.data("$binding")||[];G(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:v;Z.$$addBindingClass=
n?function(a){D(a,"ng-binding")}:v;Z.$$addScopeInfo=n?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:v;Z.$$addScopeClass=n?function(a,b){D(a,b?"ng-isolate-scope":"ng-scope")}:v;return Z}]}function wa(b){return hb(b.replace(Zc,""))}function bd(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function $c(b){b=y(b);var a=b.length;if(1>=a)return b;for(;a--;)8===
b[a].nodeType&&Mf.call(b,a,1);return b}function Xe(){var b={},a=!1;this.register=function(a,d){Ra(a,"controller");H(a)?P(b,a):b[a]=d};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(c,d){function e(a,b,c,d){if(!a||!H(a.$scope))throw J("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,g,h,l){var k,n,r;h=!0===h;l&&L(l)&&(r=l);if(L(f)){l=f.match(Xc);if(!l)throw Nf("ctrlfmt",f);n=l[1];r=r||l[3];f=b.hasOwnProperty(n)?b[n]:Dc(g.$scope,n,!0)||(a?Dc(d,n,!0):t);Qa(f,
n,!0)}if(h)return h=(G(f)?f[f.length-1]:f).prototype,k=Object.create(h||null),r&&e(g,r,k,n||f.name),P(function(){var a=c.invoke(f,k,g,n);a!==k&&(H(a)||z(a))&&(k=a,r&&e(g,r,k,n||f.name));return k},{instance:k,identifier:r});k=c.instantiate(f,g,n);r&&e(g,r,k,n||f.name);return k}}]}function Ye(){this.$get=["$window",function(b){return y(b.document)}]}function Ze(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Zb(b){return H(b)?aa(b)?b.toISOString():db(b):b}
function cf(){this.$get=function(){return function(b){if(!b)return"";var a=[];oc(b,function(b,d){null===b||A(b)||(G(b)?m(b,function(b,c){a.push(ma(d)+"="+ma(Zb(b)))}):a.push(ma(d)+"="+ma(Zb(b))))});return a.join("&")}}}function df(){this.$get=function(){return function(b){function a(b,e,f){null===b||A(b)||(G(b)?m(b,function(b){a(b,e+"[]")}):H(b)&&!aa(b)?oc(b,function(b,c){a(b,e+(f?"":"[")+c+(f?"":"]"))}):c.push(ma(e)+"="+ma(Zb(b))))}if(!b)return"";var c=[];a(b,"",!0);return c.join("&")}}}function $b(b,
a){if(L(b)){var c=b.replace(Of,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(cd))||(d=(d=c.match(Pf))&&Qf[d[0]].test(c));d&&(b=wc(c))}}return b}function dd(b){var a=ga(),c;L(b)?m(b.split("\n"),function(b){c=b.indexOf(":");var e=M(R(b.substr(0,c)));b=R(b.substr(c+1));e&&(a[e]=a[e]?a[e]+", "+b:b)}):H(b)&&m(b,function(b,c){var f=M(c),g=R(b);f&&(a[f]=a[f]?a[f]+", "+g:g)});return a}function ed(b){var a;return function(c){a||(a=dd(b));return c?(c=a[M(c)],void 0===c&&(c=null),c):a}}function fd(b,
a,c,d){if(z(d))return d(b,a,c);m(d,function(d){b=d(b,a,c)});return b}function bf(){var b=this.defaults={transformResponse:[$b],transformRequest:[function(a){return H(a)&&"[object File]"!==sa.call(a)&&"[object Blob]"!==sa.call(a)&&"[object FormData]"!==sa.call(a)?db(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ia(ac),put:ia(ac),patch:ia(ac)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},a=!1;this.useApplyAsync=function(b){return w(b)?
(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,l){function k(a){function c(a){var b=P({},a);b.data=a.data?fd(a.data,a.headers,a.status,e.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}function d(a,b){var c,e={};m(a,function(a,d){z(a)?(c=a(b),null!=c&&(e[d]=c)):e[d]=a});return e}if(!ca.isObject(a))throw J("$http")("badreq",a);var e=P({method:"get",transformRequest:b.transformRequest,
transformResponse:b.transformResponse,paramSerializer:b.paramSerializer},a);e.headers=function(a){var c=b.headers,e=P({},a.headers),f,g,h,c=P({},c.common,c[M(a.method)]);a:for(f in c){g=M(f);for(h in e)if(M(h)===g)continue a;e[f]=c[f]}return d(e,ia(a))}(a);e.method=rb(e.method);e.paramSerializer=L(e.paramSerializer)?l.get(e.paramSerializer):e.paramSerializer;var f=[function(a){var d=a.headers,e=fd(a.data,ed(d),t,a.transformRequest);A(e)&&m(d,function(a,b){"content-type"===M(b)&&delete d[b]});A(a.withCredentials)&&
!A(b.withCredentials)&&(a.withCredentials=b.withCredentials);return n(a,e).then(c,c)},t],g=h.when(e);for(m(x,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){Qa(a,"fn");g.then(function(b){a(b.data,b.status,b.headers,e)});return g};g.error=function(a){Qa(a,"fn");g.then(null,function(b){a(b.data,b.status,b.headers,e)});return g};return g}
function n(c,f){function l(b,c,d,e){function f(){n(c,b,d,e)}N&&(200<=b&&300>b?N.put(S,[b,c,dd(d),e]):N.remove(S));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function n(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?I.resolve:I.reject)({data:a,status:b,headers:ed(d),config:c,statusText:e})}function x(a){n(a.data,a.status,ia(a.headers()),a.statusText)}function m(){var a=k.pendingRequests.indexOf(c);-1!==a&&k.pendingRequests.splice(a,1)}var I=h.defer(),B=I.promise,N,D,q=c.headers,S=r(c.url,c.paramSerializer(c.params));
k.pendingRequests.push(c);B.then(m,m);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(N=H(c.cache)?c.cache:H(b.cache)?b.cache:s);N&&(D=N.get(S),w(D)?D&&z(D.then)?D.then(x,x):G(D)?n(D[1],D[0],ia(D[2]),D[3]):n(D,200,{},"OK"):N.put(S,B));A(D)&&((D=gd(c.url)?e()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(q[c.xsrfHeaderName||b.xsrfHeaderName]=D),d(c.method,S,f,l,q,c.timeout,c.withCredentials,c.responseType));return B}function r(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);
return a}var s=f("$http");b.paramSerializer=L(b.paramSerializer)?l.get(b.paramSerializer):b.paramSerializer;var x=[];m(c,function(a){x.unshift(L(a)?l.get(a):l.invoke(a))});k.pendingRequests=[];(function(a){m(arguments,function(a){k[a]=function(b,c){return k(P({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){m(arguments,function(a){k[a]=function(b,c,d){return k(P({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");k.defaults=b;return k}]}function Rf(){return new O.XMLHttpRequest}
function ef(){this.$get=["$browser","$window","$document",function(b,a,c){return Sf(b,Rf,b.defer,a.angular.callbacks,c[0])}]}function Sf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),n=null;f.type="text/javascript";f.src=a;f.async=!0;n=function(a){f.removeEventListener("load",n,!1);f.removeEventListener("error",n,!1);e.body.removeChild(f);f=null;var g=-1,x="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),x=a.type,g="error"===a.type?404:200);c&&c(g,x)};f.addEventListener("load",
n,!1);f.addEventListener("error",n,!1);e.body.appendChild(f);return n}return function(e,h,l,k,n,r,s,x){function C(){p&&p();K&&K.abort()}function F(a,d,e,f,g){I!==t&&c.cancel(I);p=K=null;a(d,e,f,g);b.$$completeOutstandingRequest(v)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==M(e)){var u="_"+(d.counter++).toString(36);d[u]=function(a){d[u].data=a;d[u].called=!0};var p=f(h.replace("JSON_CALLBACK","angular.callbacks."+u),u,function(a,b){F(k,a,d[u].data,"",b);d[u]=v})}else{var K=a();K.open(e,
h,!0);m(n,function(a,b){w(a)&&K.setRequestHeader(b,a)});K.onload=function(){var a=K.statusText||"",b="response"in K?K.response:K.responseText,c=1223===K.status?204:K.status;0===c&&(c=b?200:"file"==Ba(h).protocol?404:0);F(k,c,b,K.getAllResponseHeaders(),a)};e=function(){F(k,-1,null,null,"")};K.onerror=e;K.onabort=e;s&&(K.withCredentials=!0);if(x)try{K.responseType=x}catch(q){if("json"!==x)throw q;}K.send(l)}if(0<r)var I=c(C,r);else r&&z(r.then)&&r.then(C)}}function $e(){var b="{{",a="}}";this.startSymbol=
function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(n,b).replace(r,a)}function h(f,h,n,r){function u(a){try{var b=a;a=n?e.getTrusted(n,b):e.valueOf(b);var c;if(r&&!w(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=db(a)}c=a}return c}catch(g){d(Ka.interr(f,g))}}r=!!r;for(var p,m,q=0,I=
[],B=[],N=f.length,D=[],t=[];q<N;)if(-1!=(p=f.indexOf(b,q))&&-1!=(m=f.indexOf(a,p+l)))q!==p&&D.push(g(f.substring(q,p))),q=f.substring(p+l,m),I.push(q),B.push(c(q,u)),q=m+k,t.push(D.length),D.push("");else{q!==N&&D.push(g(f.substring(q)));break}n&&1<D.length&&Ka.throwNoconcat(f);if(!h||I.length){var S=function(a){for(var b=0,c=I.length;b<c;b++){if(r&&A(a[b]))return;D[t[b]]=a[b]}return D.join("")};return P(function(a){var b=0,c=I.length,e=Array(c);try{for(;b<c;b++)e[b]=B[b](a);return S(e)}catch(g){d(Ka.interr(f,
g))}},{exp:f,expressions:I,$$watchDelegate:function(a,b){var c;return a.$watchGroup(B,function(d,e){var f=S(d);z(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=b.length,k=a.length,n=new RegExp(b.replace(/./g,f),"g"),r=new RegExp(a.replace(/./g,f),"g");h.startSymbol=function(){return b};h.endSymbol=function(){return a};return h}]}function af(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var n=4<arguments.length,r=n?za.call(arguments,4):[],s=a.setInterval,x=a.clearInterval,
C=0,F=w(k)&&!k,u=(F?d:c).defer(),p=u.promise;l=w(l)?l:0;p.then(null,null,n?function(){e.apply(null,r)}:e);p.$$intervalId=s(function(){u.notify(C++);0<l&&C>=l&&(u.resolve(C),x(p.$$intervalId),delete f[p.$$intervalId]);F||b.$apply()},h);f[p.$$intervalId]=u;return p}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function ge(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",
GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a",ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"]},pluralCat:function(b){return 1===b?"one":"other"}}}}function bc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=ob(b[a]);return b.join("/")}function hd(b,a){var c=Ba(b);a.$$protocol=c.protocol;
a.$$host=c.hostname;a.$$port=W(c.port)||Tf[c.protocol]||null}function id(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Ba(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=zc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ya(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ja(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Bb(b){return b.replace(/(#.+)|#$/,
"$1")}function cc(b){return b.substr(0,Ja(b).lastIndexOf("/")+1)}function dc(b,a){this.$$html5=!0;a=a||"";var c=cc(b);hd(b,this);this.$$parse=function(a){var b=ya(c,a);if(!L(b))throw Cb("ipthprfx",a,c);id(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Qb(this.$$search),b=this.$$hash?"#"+ob(this.$$hash):"";this.$$url=bc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),
!0;var f,g;(f=ya(b,d))!==t?(g=f,g=(f=ya(a,f))!==t?c+(ya("/",f)||f):b+g):(f=ya(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function ec(b,a){var c=cc(b);hd(b,this);this.$$parse=function(d){var e=ya(b,d)||ya(c,d),f;A(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",A(e)&&(b=d,this.replace())):(f=ya(a,e),A(f)&&(f=e));id(f,this);d=this.$$path;var e=b,g=/^\/[A-Z]:(\/.*)/;0===f.indexOf(e)&&(f=f.replace(e,""));g.exec(f)||(d=(f=g.exec(d))?f[1]:d);this.$$path=d;this.$$compose()};this.$$compose=
function(){var c=Qb(this.$$search),e=this.$$hash?"#"+ob(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ja(b)==Ja(a)?(this.$$parse(a),!0):!1}}function jd(b,a){this.$$html5=!0;ec.apply(this,arguments);var c=cc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ja(d)?f=d:(g=ya(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=
Qb(this.$$search),e=this.$$hash?"#"+ob(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Db(b){return function(){return this[b]}}function kd(b,a){return function(c){if(A(c))return this[b];this[b]=a(c);this.$$compose();return this}}function ff(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return w(a)?(b=a,this):b};this.html5Mode=function(b){return ab(b)?(a.enabled=b,this):H(b)?(ab(b.enabled)&&(a.enabled=b.enabled),
ab(b.requireBase)&&(a.requireBase=b.requireBase),ab(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,n;n=d.baseHref();var r=d.url(),s;if(a.enabled){if(!n&&a.requireBase)throw Cb("nobase");s=r.substring(0,
r.indexOf("/",r.indexOf("//")+2))+(n||"/");n=e.history?dc:jd}else s=Ja(r),n=ec;k=new n(s,"#"+b);k.$$parseLinkUrl(r,r);k.$$state=d.state();var x=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=y(b.target);"a"!==ta(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");H(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Ba(h.animVal).href);x.test(h)||
!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});Bb(k.absUrl())!=Bb(r)&&d.url(k.absUrl(),!0);var C=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(C=!1,l(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=
Bb(d.url()),b=Bb(k.absUrl()),f=d.state(),g=k.$$replace,n=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(C||n)C=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=f):(n&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function gf(){var b=!0,a=this;this.debugEnabled=function(a){return w(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&
(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||v;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];m(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}
function Ca(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw da("isecfld",a);return b}function oa(b,a){if(b){if(b.constructor===b)throw da("isecfn",a);if(b.window===b)throw da("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw da("isecdom",a);if(b===Object)throw da("isecobj",a);}return b}function ld(b,a){if(b){if(b.constructor===b)throw da("isecfn",a);if(b===Uf||b===Vf||b===Wf)throw da("isecff",a);
}}function Xf(b,a){return"undefined"!==typeof b?b:a}function md(b,a){return"undefined"===typeof b?a:"undefined"===typeof a?b:b+a}function T(b,a){var c,d;switch(b.type){case q.Program:c=!0;m(b.body,function(b){T(b.expression,a);c=c&&b.expression.constant});b.constant=c;break;case q.Literal:b.constant=!0;b.toWatch=[];break;case q.UnaryExpression:T(b.argument,a);b.constant=b.argument.constant;b.toWatch=b.argument.toWatch;break;case q.BinaryExpression:T(b.left,a);T(b.right,a);b.constant=b.left.constant&&
b.right.constant;b.toWatch=b.left.toWatch.concat(b.right.toWatch);break;case q.LogicalExpression:T(b.left,a);T(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=b.constant?[]:[b];break;case q.ConditionalExpression:T(b.test,a);T(b.alternate,a);T(b.consequent,a);b.constant=b.test.constant&&b.alternate.constant&&b.consequent.constant;b.toWatch=b.constant?[]:[b];break;case q.Identifier:b.constant=!1;b.toWatch=[b];break;case q.MemberExpression:T(b.object,a);b.computed&&T(b.property,a);
b.constant=b.object.constant&&(!b.computed||b.property.constant);b.toWatch=[b];break;case q.CallExpression:c=b.filter?!a(b.callee.name).$stateful:!1;d=[];m(b.arguments,function(b){T(b,a);c=c&&b.constant;b.constant||d.push.apply(d,b.toWatch)});b.constant=c;b.toWatch=b.filter&&!a(b.callee.name).$stateful?d:[b];break;case q.AssignmentExpression:T(b.left,a);T(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=[b];break;case q.ArrayExpression:c=!0;d=[];m(b.elements,function(b){T(b,a);c=
c&&b.constant;b.constant||d.push.apply(d,b.toWatch)});b.constant=c;b.toWatch=d;break;case q.ObjectExpression:c=!0;d=[];m(b.properties,function(b){T(b.value,a);c=c&&b.value.constant;b.value.constant||d.push.apply(d,b.value.toWatch)});b.constant=c;b.toWatch=d;break;case q.ThisExpression:b.constant=!1,b.toWatch=[]}}function nd(b){if(1==b.length){b=b[0].expression;var a=b.toWatch;return 1!==a.length?a:a[0]!==b?a:t}}function od(b){return b.type===q.Identifier||b.type===q.MemberExpression}function pd(b){if(1===
b.body.length&&od(b.body[0].expression))return{type:q.AssignmentExpression,left:b.body[0].expression,right:{type:q.NGValueParameter},operator:"="}}function qd(b){return 0===b.body.length||1===b.body.length&&(b.body[0].expression.type===q.Literal||b.body[0].expression.type===q.ArrayExpression||b.body[0].expression.type===q.ObjectExpression)}function rd(b,a){this.astBuilder=b;this.$filter=a}function sd(b,a){this.astBuilder=b;this.$filter=a}function Eb(b,a,c,d){oa(b,d);a=a.split(".");for(var e,f=0;1<
a.length;f++){e=Ca(a.shift(),d);var g=oa(b[e],d);g||(g={},b[e]=g);b=g}e=Ca(a.shift(),d);oa(b[e],d);return b[e]=c}function Fb(b){return"constructor"==b}function fc(b){return z(b.valueOf)?b.valueOf():Yf.call(b)}function hf(){var b=ga(),a=ga();this.$get=["$filter","$sniffer",function(c,d){function e(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function f(a,b,c,d,f){var g=d.inputs,h;if(1===g.length){var k=e,g=g[0];return a.$watch(function(a){var b=
g(a);e(b,k)||(h=d(a,t,t,[b]),k=b&&fc(b));return h},b,c,f)}for(var l=[],n=[],r=0,m=g.length;r<m;r++)l[r]=e,n[r]=null;return a.$watch(function(a){for(var b=!1,c=0,f=g.length;c<f;c++){var k=g[c](a);if(b||(b=!e(k,l[c])))n[c]=k,l[c]=k&&fc(k)}b&&(h=d(a,t,t,n));return h},b,c,f)}function g(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;z(b)&&b.apply(this,arguments);w(a)&&d.$$postDigest(function(){w(f)&&e()})},c)}function h(a,b,c,d){function e(a){var b=!0;m(a,function(a){w(a)||
(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;z(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function l(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){z(b)&&b.apply(this,arguments);e()},c)}function k(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==h&&c!==g?function(c,d,e,f){e=a(c,d,e,f);return b(e,c,d)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return w(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==
f?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=f,c.inputs=a.inputs?a.inputs:[a]);return c}var n={csp:d.csp,expensiveChecks:!1},r={csp:d.csp,expensiveChecks:!0};return function(d,e,C){var m,u,p;switch(typeof d){case "string":p=d=d.trim();var q=C?a:b;m=q[p];m||(":"===d.charAt(0)&&":"===d.charAt(1)&&(u=!0,d=d.substring(2)),C=C?r:n,m=new gc(C),m=(new hc(m,c,C)).parse(d),m.constant?m.$$watchDelegate=l:u?m.$$watchDelegate=m.literal?h:g:m.inputs&&(m.$$watchDelegate=f),q[p]=m);return k(m,
e);case "function":return k(d,e);default:return v}}}]}function kf(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return td(function(a){b.$evalAsync(a)},a)}]}function lf(){this.$get=["$browser","$exceptionHandler",function(b,a){return td(function(a){b.defer(a)},a)}]}function td(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&
c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{z(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=J("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||
[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(H(b)||z(b))d=b&&b.then;z(d)?(this.promise.$$state.status=
-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(z(b)?
b(c):c)}catch(h){a(h)}}})}};var l=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{z(c)&&(d=c())}catch(e){return l(e,!1)}return d&&z(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},n=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},r=function x(a){if(!z(a))throw h("norslvr",a);if(!(this instanceof x))return new x(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};
r.defer=function(){return new g};r.reject=function(a){var b=new g;b.reject(a);return b.promise};r.when=n;r.resolve=n;r.all=function(a){var b=new g,c=0,d=G(a)?[]:{};m(a,function(a,e){c++;n(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return r}function uf(){this.$get=["$window","$timeout",function(b,a){function c(){for(var a=0;a<n.length;a++){var b=n[a];b&&(n[a]=null,b())}k=n.length=0}function d(a){var b=
n.length;k++;n.push(a);0===b&&(l=h(c));return function(){0<=b&&(b=n[b]=null,0===--k&&l&&(l(),l=null,n.length=0))}}var e=b.requestAnimationFrame||b.webkitRequestAnimationFrame,f=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,g=!!e,h=g?function(a){var b=e(a);return function(){f(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};d.supported=g;var l,k=0,n=[];return d}]}function jf(){function b(a){function b(){this.$$watchers=this.$$nextSibling=
this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++nb;this.$$ChildScope=null}b.prototype=a;return b}var a=10,c=J("$rootScope"),d=null,e=null;this.digestTtl=function(b){arguments.length&&(a=b);return a};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(f,g,h,l){function k(a){a.currentScope.$$destroyed=!0}function n(){this.$id=++nb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=
this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function r(a){if(p.$$phase)throw c("inprog",p.$$phase);p.$$phase=a}function s(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function x(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function q(){}function F(){for(;I.length;)try{I.shift()()}catch(a){g(a)}e=null}function u(){null===e&&(e=
l.defer(function(){p.$apply(F)}))}n.prototype={constructor:n,$new:function(a,c){var d;c=c||this;a?(d=new n,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=b(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(a||c!=this)&&d.$on("$destroy",k);return d},$watch:function(a,b,c,e){var f=h(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,c,f,a);var g=this,k=g.$$watchers,l=
{fn:b,last:q,get:f,exp:e||a,eq:!!c};d=null;z(b)||(l.fn=v);k||(k=g.$$watchers=[]);k.unshift(l);s(this,1);return function(){0<=bb(k,l)&&s(g,-1);d=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});m(a,function(a,b){var k=g.$watch(a,function(a,
f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!A(e)){if(H(e))if(Ea(e))for(f!==r&&(f=r,m=f.length=0,l++),a=e.length,m!==a&&(l++,f.length=m=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==s&&(f=s={},m=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(m++,f[b]=g,l++));if(m>a)for(b in l++,f)e.hasOwnProperty(b)||
(m--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,g,k=1<b.length,l=0,n=h(a,c),r=[],s={},p=!0,m=0;return this.$watch(n,function(){p?(p=!1,b(e,e,d)):b(e,g,d);if(k)if(H(e))if(Ea(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)Xa.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var b,f,h,k,n,s,m=a,x,u=[],E,I;r("$digest");l.$$checkUrlChange();this===p&&null!==e&&(l.defer.cancel(e),F());d=null;do{s=!1;for(x=this;t.length;){try{I=t.shift(),
I.scope.$eval(I.expression,I.locals)}catch(v){g(v)}d=null}a:do{if(k=x.$$watchers)for(n=k.length;n--;)try{if(b=k[n])if((f=b.get(x))!==(h=b.last)&&!(b.eq?ka(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))s=!0,d=b,b.last=b.eq?fa(f,null):f,b.fn(f,h===q?f:h,x),5>m&&(E=4-m,u[E]||(u[E]=[]),u[E].push({msg:z(b.exp)?"fn: "+(b.exp.name||b.exp.toString()):b.exp,newVal:f,oldVal:h}));else if(b===d){s=!1;break a}}catch(A){g(A)}if(!(k=x.$$watchersCount&&x.$$childHead||x!==this&&x.$$nextSibling))for(;x!==
this&&!(k=x.$$nextSibling);)x=x.$parent}while(x=k);if((s||t.length)&&!m--)throw p.$$phase=null,c("infdig",a,u);}while(s||t.length);for(p.$$phase=null;w.length;)try{w.shift()()}catch(y){g(y)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===p&&l.$$applicationDestroyed();s(this,-this.$$watchersCount);for(var b in this.$$listenerCount)x(this,this.$$listenerCount[b],b);a&&a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==
this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=v;this.$on=this.$watch=this.$watchGroup=function(){return v};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}},$eval:function(a,b){return h(a)(this,b)},
$evalAsync:function(a,b){p.$$phase||t.length||l.defer(function(){t.length&&p.$digest()});t.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){w.push(a)},$apply:function(a){try{return r("$apply"),this.$eval(a)}catch(b){g(b)}finally{p.$$phase=null;try{p.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&I.push(b);u()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||
(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,x(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,f=!1,h={name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=cb([h],arguments,1),l,n;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(n=d.length;l<n;l++)if(d[l])try{d[l].apply(null,k)}catch(r){g(r)}else d.splice(l,1),l--,n--;if(f)return h.currentScope=
null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var f=cb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){g(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=
c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var p=new n,t=p.$$asyncQueue=[],w=p.$$postDigestQueue=[],I=p.$$applyAsyncQueue=[];return p}]}function he(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return w(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return w(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Ba(c).href;return""===f||f.match(e)?c:"unsafe:"+
f}}}function Zf(b){if("self"===b)return b;if(L(b)){if(-1<b.indexOf("***"))throw Da("iwcard",b);b=ud(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(Za(b))return new RegExp("^"+b.source+"$");throw Da("imatcher");}function vd(b){var a=[];w(b)&&m(b,function(b){a.push(Zf(b))});return a}function nf(){this.SCE_CONTEXTS=pa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=vd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&
(a=vd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?gd(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Da("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[pa.HTML]=e(g);h[pa.CSS]=e(g);h[pa.URL]=
e(g);h[pa.JS]=e(g);h[pa.RESOURCE_URL]=e(h[pa.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Da("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Da("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===pa.RESOURCE_URL){var g=Ba(e.toString()),r,s,m=!1;r=0;for(s=b.length;r<s;r++)if(d(b[r],g)){m=!0;break}if(m)for(r=
0,s=a.length;r<s;r++)if(d(a[r],g)){m=!1;break}if(m)return e;throw Da("insecurl",e.toString());}if(c===pa.HTML)return f(e);throw Da("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function mf(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Ua)throw Da("iequirks");var d=ia(pa);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=
d.getTrusted=function(a,b){return b},d.valueOf=Ya);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;m(pa,function(a,b){var c=M(b);d[hb("parse_as_"+c)]=function(b){return e(a,b)};d[hb("get_trusted_"+c)]=function(b){return f(a,b)};d[hb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function of(){this.$get=["$window","$document",function(b,a){var c={},d=W((/android (\d+)/.exec(M((b.navigator||
{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,n=!1;if(l){for(var r in l)if(k=h.exec(r)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);n=!!("animation"in l||g+"Animation"in l);!d||k&&n||(k=L(l.webkitTransition),n=L(l.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===
a&&11>=Ua)return!1;if(A(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:fb(),vendorPrefix:g,transitions:k,animations:n,android:d}}]}function qf(){this.$get=["$templateCache","$http","$q","$sce",function(b,a,c,d){function e(f,g){e.totalPendingRequests++;L(f)&&b.get(f)||(f=d.getTrustedResourceUrl(f));var h=a.defaults&&a.defaults.transformResponse;G(h)?h=h.filter(function(a){return a!==$b}):h===$b&&(h=null);return a.get(f,{cache:b,transformResponse:h})["finally"](function(){e.totalPendingRequests--}).then(function(a){b.put(f,
a.data);return a.data},function(a){if(!g)throw ea("tpload",f,a.status,a.statusText);return c.reject(a)})}e.totalPendingRequests=0;return e}]}function rf(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];m(a,function(a){var d=ca.element(a).data("$binding");d&&m(d,function(d){c?(new RegExp("(^|\\s)"+ud(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,
b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function sf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){z(f)||(k=l,l=f,f=v);var n=za.call(arguments,3),r=w(k)&&!k,s=(r?d:c).defer(),
m=s.promise,q;q=a.defer(function(){try{s.resolve(f.apply(null,n))}catch(a){s.reject(a),e(a)}finally{delete g[m.$$timeoutId]}r||b.$apply()},l);m.$$timeoutId=q;g[q]=s;return m}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Ba(b){Ua&&(X.setAttribute("href",b),b=X.href);X.setAttribute("href",b);return{href:X.href,protocol:X.protocol?X.protocol.replace(/:$/,""):"",host:X.host,
search:X.search?X.search.replace(/^\?/,""):"",hash:X.hash?X.hash.replace(/^#/,""):"",hostname:X.hostname,port:X.port,pathname:"/"===X.pathname.charAt(0)?X.pathname:"/"+X.pathname}}function gd(b){b=L(b)?Ba(b):b;return b.protocol===wd.protocol&&b.host===wd.host}function tf(){this.$get=ra(O)}function xd(b){function a(a){try{return decodeURIComponent(a)}catch(b){return a}}var c=b[0]||{},d={},e="";return function(){var b,g,h,l,k;b=c.cookie||"";if(b!==e)for(e=b,b=e.split("; "),d={},h=0;h<b.length;h++)g=
b[h],l=g.indexOf("="),0<l&&(k=a(g.substring(0,l)),d[k]===t&&(d[k]=a(g.substring(l+1))));return d}}function xf(){this.$get=xd}function Lc(b){function a(c,d){if(H(c)){var e={};m(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",yd);a("date",zd);a("filter",$f);a("json",ag);a("limitTo",bg);a("lowercase",cg);a("number",Ad);a("orderBy",Bd);a("uppercase",dg)}function $f(){return function(b,
a,c){if(!Ea(b)){if(null==b)return b;throw J("filter")("notarray",b);}var d;switch(ic(a)){case "function":break;case "boolean":case "null":case "number":case "string":d=!0;case "object":a=eg(a,c,d);break;default:return b}return Array.prototype.filter.call(b,a)}}function eg(b,a,c){var d=H(b)&&"$"in b;!0===a?a=ka:z(a)||(a=function(a,b){if(A(a))return!1;if(null===a||null===b)return a===b;if(H(b)||H(a)&&!rc(a))return!1;a=M(""+a);b=M(""+b);return-1!==a.indexOf(b)});return function(e){return d&&!H(e)?La(e,
b.$,a,!1):La(e,b,a,c)}}function La(b,a,c,d,e){var f=ic(b),g=ic(a);if("string"===g&&"!"===a.charAt(0))return!La(b,a.substring(1),c,d);if(G(b))return b.some(function(b){return La(b,a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&La(b[h],a,c,!0))return!0;return e?!1:La(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!z(e)&&!A(e)&&(f="$"===h,!La(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function ic(b){return null===
b?"null":typeof b}function yd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){A(d)&&(d=a.CURRENCY_SYM);A(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:Cd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function Ad(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:Cd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Cd(b,a,c,d,e){if(H(b))return"";var f=0>b;b=Math.abs(b);var g=Infinity===b;if(!g&&!isFinite(b))return"";var h=b+"",l="",k=!1,n=[];g&&(l="\u221e");
if(!g&&-1!==h.indexOf("e")){var r=h.match(/([\d\.]+)e(-?)(\d+)/);r&&"-"==r[2]&&r[3]>e+1?b=0:(l=h,k=!0)}if(g||k)0<e&&1>b&&(l=b.toFixed(e),b=parseFloat(l));else{g=(h.split(Dd)[1]||"").length;A(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(Dd),h=g[0],g=g[1]||"",r=0,s=a.lgSize,m=a.gSize;if(h.length>=s+m)for(r=h.length-s,k=0;k<r;k++)0===(r-k)%m&&0!==k&&(l+=c),l+=h.charAt(k);for(k=r;k<h.length;k++)0===(h.length-k)%s&&0!==k&&
(l+=c),l+=h.charAt(k);for(;g.length<e;)g+="0";e&&"0"!==e&&(l+=d+g.substr(0,e))}0===b&&(f=!1);n.push(f?a.negPre:a.posPre,l,f?a.negSuf:a.posSuf);return n.join("")}function Gb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function Y(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Gb(e,a,d)}}function Hb(b,a){return function(c,d){var e=c["get"+b](),f=rb(a?"SHORT"+b:b);return d[f][e]}}function Ed(b){var a=
(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function Fd(b){return function(a){var c=Ed(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Gb(a,b)}}function jc(b,a){return 0>=b.getFullYear()?a.ERAS[0]:a.ERAS[1]}function zd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=W(b[9]+b[10]),g=W(b[9]+b[11]));h.call(a,W(b[1]),
W(b[2])-1,W(b[3]));f=W(b[4]||0)-f;g=W(b[5]||0)-g;h=W(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;L(c)&&(c=fg.test(c)?W(c):a(c));V(c)&&(c=new Date(c));if(!aa(c)||!isFinite(c.getTime()))return c;for(;e;)(k=gg.exec(e))?(h=cb(h,k,1),e=h.pop()):(h.push(e),e=null);var n=c.getTimezoneOffset();
f&&(n=xc(f,c.getTimezoneOffset()),c=Pb(c,f,!0));m(h,function(a){l=hg[a];g+=l?l(c,b.DATETIME_FORMATS,n):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ag(){return function(b,a){A(a)&&(a=2);return db(b,a)}}function bg(){return function(b,a,c){a=Infinity===Math.abs(Number(a))?Number(a):W(a);if(isNaN(a))return b;V(b)&&(b=b.toString());if(!G(b)&&!L(b))return b;c=!c||isNaN(c)?0:W(c);c=0>c&&c>=-b.length?b.length+c:c;return 0<=a?b.slice(c,c+a):0===c?b.slice(a,b.length):b.slice(Math.max(0,
c+a),c)}}function Bd(b){function a(a,c){c=c?-1:1;return a.map(function(a){var d=1,h=Ya;if(z(a))h=a;else if(L(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))d="-"==a.charAt(0)?-1:1,a=a.substring(1);if(""!==a&&(h=b(a),h.constant))var l=h(),h=function(a){return a[l]}}return{get:h,descending:d*c}})}function c(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(b,e,f){if(!Ea(b))return b;G(e)||(e=[e]);0===e.length&&(e=["+"]);var g=a(e,f);b=Array.prototype.map.call(b,
function(a,b){return{value:a,predicateValues:g.map(function(d){var e=d.get(a);d=typeof e;if(null===e)d="string",e="null";else if("string"===d)e=e.toLowerCase();else if("object"===d)a:{if("function"===typeof e.valueOf&&(e=e.valueOf(),c(e)))break a;if(rc(e)&&(e=e.toString(),c(e)))break a;e=b}return{value:e,type:d}})}});b.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],m=0;c.type===f.type?c.value!==f.value&&(m=c.value<f.value?-1:1):m=c.type<f.type?
-1:1;if(c=m*g[d].descending)break}return c});return b=b.map(function(a){return a.value})}}function Ma(b){z(b)&&(b={link:b});b.restrict=b.restrict||"AC";return ra(b)}function Gd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Ib;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){m(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=
function(){m(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ra(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];m(f.$pending,function(b,c){f.$setValidity(c,null,a)});m(f.$error,function(b,c){f.$setValidity(c,null,a)});m(f.$$success,function(b,c){f.$setValidity(c,null,a)});bb(g,a)};Hd({ctrl:this,$element:b,set:function(a,b,
c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(bb(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Va);d.addClass(b,Jb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Va,Jb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;m(g,function(a){a.$setPristine()})};f.$setUntouched=function(){m(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,
"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function kc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function kb(b,a,c,d,e,f){var g=M(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=R(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};
if(e.hasEvent("input"))a.on("input",l);else{var k,n=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||n(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",n)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function Kb(b,a){return function(c,d){var e,f;if(aa(c))return c;if(L(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));
if(ig.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},m(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function lb(b,a,c,d){return function(e,f,g,h,l,k,n){function r(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function s(a){return w(a)?
aa(a)?a:c(a):t}Id(e,f,g,h);kb(e,f,g,h,l,k);var m=h&&h.$options&&h.$options.timezone,q;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,q),m&&(b=Pb(b,m)),b):t});h.$formatters.push(function(a){if(a&&!aa(a))throw Lb("datefmt",a);if(r(a))return(q=a)&&m&&(q=Pb(q,m,!0)),n("date")(a,d,m);q=null;return""});if(w(g.min)||g.ngMin){var F;h.$validators.min=function(a){return!r(a)||A(F)||c(a)>=F};g.$observe("min",function(a){F=s(a);h.$validate()})}if(w(g.max)||g.ngMax){var u;
h.$validators.max=function(a){return!r(a)||A(u)||c(a)<=u};g.$observe("max",function(a){u=s(a);h.$validate()})}}}function Id(b,a,c,d){(d.$$hasNativeValidators=H(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function Jd(b,a,c,d,e){if(w(d)){b=b(d);if(!b.constant)throw J("ngModel")("constexpr",c,d);return b(a)}return e}function lc(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=
a[d],n=0;n<b.length;n++)if(e==b[n])continue a;c.push(e)}return c}function e(a){var b=[];return G(a)?(m(a,function(a){b=b.concat(e(a))}),b):L(a)?a.split(" "):H(a)?(m(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||ga(),d=[];m(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||f.$index%2===a){var k=e(b||[]);if(!n){var m=
l(k,1);h.$addClass(m)}else if(!ka(b,n)){var q=e(n),m=d(k,q),k=d(q,k),m=l(m,1),k=l(k,-1);m&&m.length&&c.addClass(g,m);k&&k.length&&c.removeClass(g,k)}}n=ia(b)}var n;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function Hd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}
function c(b,c){b=b?"-"+Bc(b,"-"):"";a(mb+b,!0===c);a(Kd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[Kd]=!(f[mb]=e.hasClass(mb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),Ld(d.$pending)&&(d.$pending=t));ab(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(Md,!0),d.$valid=d.$invalid=t,c("",null)):(a(Md,
!1),d.$valid=Ld(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function Ld(b){if(b)for(var a in b)if(b.hasOwnProperty(a))return!1;return!0}var jg=/^\/(.+)\/([a-z]*)$/,M=function(b){return L(b)?b.toLowerCase():b},Xa=Object.prototype.hasOwnProperty,rb=function(b){return L(b)?b.toUpperCase():b},Ua,y,la,za=[].slice,Mf=[].splice,kg=[].push,sa=Object.prototype.toString,sc=Object.getPrototypeOf,Fa=J("ng"),ca=
O.angular||(O.angular={}),gb,nb=0;Ua=U.documentMode;v.$inject=[];Ya.$inject=[];var G=Array.isArray,uc=/^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/,R=function(b){return L(b)?b.trim():b},ud=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},fb=function(){if(w(fb.isActive_))return fb.isActive_;var b=!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return fb.isActive_=
b},pb=function(){if(w(pb.name_))return pb.name_;var b,a,c=Oa.length,d,e;for(a=0;a<c;++a)if(d=Oa[a],b=U.querySelector("["+d.replace(":","\\:")+"jq]")){e=b.getAttribute(d+"jq");break}return pb.name_=e},Oa=["ng-","data-ng-","ng:","x-ng-"],be=/[A-Z]/g,Cc=!1,Rb,qa=1,Na=3,fe={full:"1.4.3",major:1,minor:4,dot:3,codeName:"foam-acceleration"};Q.expando="ng339";var ib=Q.cache={},Df=1;Q._data=function(b){return this.cache[b[this.expando]]||{}};var yf=/([\:\-\_]+(.))/g,zf=/^moz([A-Z])/,lg={mouseleave:"mouseout",
mouseenter:"mouseover"},Ub=J("jqLite"),Cf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Tb=/<|&#?\w+;/,Af=/<([\w:]+)/,Bf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,na={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};na.optgroup=na.option;na.tbody=na.tfoot=na.colgroup=na.caption=na.thead;
na.th=na.td;var Pa=Q.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),Q(O).on("load",a))},toString:function(){var b=[];m(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:kg,sort:[].sort,splice:[].splice},Ab={};m("multiple selected checked disabled readOnly required open".split(" "),function(b){Ab[M(b)]=b});var Tc={};m("input select option textarea button form details".split(" "),
function(b){Tc[b]=!0});var Uc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};m({data:Wb,removeData:ub,hasData:function(b){for(var a in ib[b.ng339])return!0;return!1}},function(b,a){Q[a]=b});m({data:Wb,inheritedData:zb,scope:function(b){return y.data(b,"$scope")||zb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return y.data(b,"$isolateScope")||y.data(b,"$isolateScopeNoTemplate")},controller:Qc,injector:function(b){return zb(b,
"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:wb,css:function(b,a,c){a=hb(a);if(w(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=b.nodeType;if(d!==Na&&2!==d&&8!==d)if(d=M(a),Ab[d])if(w(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||v).specified?d:t;else if(w(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(w(c))b[a]=c;else return b[a]},
text:function(){function b(a,b){if(A(b)){var d=a.nodeType;return d===qa||d===Na?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(A(a)){if(b.multiple&&"select"===ta(b)){var c=[];m(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(A(a))return b.innerHTML;tb(b,!0);b.innerHTML=a},empty:Rc},function(b,a){Q.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Rc&&(2==b.length&&b!==wb&&b!==Qc?
a:d)===t){if(H(a)){for(e=0;e<g;e++)if(b===Wb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});m({removeData:ub,on:function a(c,d,e,f){if(w(f))throw Ub("onargs");if(Mc(c)){var g=vb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=Gf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===
d?a(c,lg[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Pc,one:function(a,c,d){a=y(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;tb(a);m(new Q(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];m(a.childNodes,function(a){a.nodeType===qa&&c.push(a)});return c},contents:function(a){return a.contentDocument||
a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===qa||11===d){c=new Q(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===qa){var d=a.firstChild;m(new Q(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Xb,detach:function(a){Xb(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new Q(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,
d.nextSibling);d=h}},addClass:yb,removeClass:xb,toggleClass:function(a,c,d){c&&m(c.split(" "),function(c){var f=d;A(f)&&(f=!wb(a,c));(f?yb:xb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Vb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=vb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===
this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:v,type:g,target:a},c.type&&(e=P(e,c)),c=ia(h),f=d?[e].concat(d):[e],m(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){Q.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)A(g)?(g=a(this[h],c,e,f),w(g)&&(g=y(g))):Oc(g,a(this[h],c,e,f));return w(g)?g:this};Q.prototype.bind=
Q.prototype.on;Q.prototype.unbind=Q.prototype.off});Sa.prototype={put:function(a,c){this[Ga(a,this.nextUid)]=c},get:function(a){return this[Ga(a,this.nextUid)]},remove:function(a){var c=this[a=Ga(a,this.nextUid)];delete this[a];return c}};var wf=[function(){this.$get=[function(){return Sa}]}],Wc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,mg=/,/,ng=/^\s*(_?)(\S+?)\1\s*$/,Vc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ha=J("$injector");eb.$$annotate=function(a,c,d){var e;if("function"===typeof a){if(!(e=a.$inject)){e=
[];if(a.length){if(c)throw L(d)&&d||(d=a.name||Hf(a)),Ha("strictdi",d);c=a.toString().replace(Vc,"");c=c.match(Wc);m(c[1].split(mg),function(a){a.replace(ng,function(a,c,d){e.push(d)})})}a.$inject=e}}else G(a)?(c=a.length-1,Qa(a[c],"fn"),e=a.slice(0,c)):Qa(a,"fn",!0);return e};var Nd=J("$animate"),Ue=function(){this.$get=["$q","$$rAF",function(a,c){function d(){}d.all=v;d.chain=v;d.prototype={end:v,cancel:v,resume:v,pause:v,complete:v,then:function(d,f){return a(function(a){c(function(){a()})}).then(d,
f)}};return d}]},Te=function(){var a=new Sa,c=[];this.$get=["$$AnimateRunner","$rootScope",function(d,e){function f(d,f,l){var k=a.get(d);k||(a.put(d,k={}),c.push(d));f&&m(f.split(" "),function(a){a&&(k[a]=!0)});l&&m(l.split(" "),function(a){a&&(k[a]=!1)});1<c.length||e.$$postDigest(function(){m(c,function(c){var d=a.get(c);if(d){var e=If(c.attr("class")),f="",g="";m(d,function(a,c){a!==!!e[c]&&(a?f+=(f.length?" ":"")+c:g+=(g.length?" ":"")+c)});m(c,function(a){f&&yb(a,f);g&&xb(a,g)});a.remove(c)}});
c.length=0})}return{enabled:v,on:v,off:v,pin:v,push:function(a,c,e,k){k&&k();e=e||{};e.from&&a.css(e.from);e.to&&a.css(e.to);(e.addClass||e.removeClass)&&f(a,e.addClass,e.removeClass);return new d}}}]},Se=["$provide",function(a){var c=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,e){if(d&&"."!==d.charAt(0))throw Nd("notcsel",d);var f=d+"-animation";c.$$registeredAnimations[d.substr(1)]=f;a.factory(f,e)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=
a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Nd("nongcls","ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function c(a,d,e){if(e){var l;a:{for(l=0;l<e.length;l++){var k=e[l];if(1===k.nodeType){l=k;break a}}l=void 0}!l||l.parentNode||l.previousElementSibling||(e=null)}e?e.after(a):d.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(f,g,h,l){g=
g&&y(g);h=h&&y(h);g=g||h.parent();c(f,g,h);return a.push(f,"enter",Ia(l))},move:function(f,g,h,l){g=g&&y(g);h=h&&y(h);g=g||h.parent();c(f,g,h);return a.push(f,"move",Ia(l))},leave:function(c,e){return a.push(c,"leave",Ia(e),function(){c.remove()})},addClass:function(c,e,h){h=Ia(h);h.addClass=jb(h.addclass,e);return a.push(c,"addClass",h)},removeClass:function(c,e,h){h=Ia(h);h.removeClass=jb(h.removeClass,e);return a.push(c,"removeClass",h)},setClass:function(c,e,h,l){l=Ia(l);l.addClass=jb(l.addClass,
e);l.removeClass=jb(l.removeClass,h);return a.push(c,"setClass",l)},animate:function(c,e,h,l,k){k=Ia(k);k.from=k.from?P(k.from,e):e;k.to=k.to?P(k.to,h):h;k.tempClasses=jb(k.tempClasses,l||"ng-inline-animate");return a.push(c,"animate",k)}}}]}],ea=J("$compile");Ec.$inject=["$provide","$$sanitizeUriProvider"];var Zc=/^((?:x|data)[\:\-_])/i,Nf=J("$controller"),Xc=/^(\S+)(\s+as\s+(\w+))?$/,cd="application/json",ac={"Content-Type":cd+";charset=utf-8"},Pf=/^\[|^\{(?!\{)/,Qf={"[":/]$/,"{":/}$/},Of=/^\)\]\}',?\n/,
Ka=ca.$interpolateMinErr=J("$interpolate");Ka.throwNoconcat=function(a){throw Ka("noconcat",a);};Ka.interr=function(a,c){return Ka("interr",a,c.toString())};var og=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,Tf={http:80,https:443,ftp:21},Cb=J("$location"),pg={$$html5:!1,$$replace:!1,absUrl:Db("$$absUrl"),url:function(a){if(A(a))return this.$$url;var c=og.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Db("$$protocol"),
host:Db("$$host"),port:Db("$$port"),path:kd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(L(a)||V(a))a=a.toString(),this.$$search=zc(a);else if(H(a))a=fa(a,{}),m(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Cb("isrcharg");break;default:A(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:kd("$$hash",function(a){return null!==
a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};m([jd,ec,dc],function(a){a.prototype=Object.create(pg);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==dc||!this.$$html5)throw Cb("nostate");this.$$state=A(c)?null:c;return this}});var da=J("$parse"),Uf=Function.prototype.call,Vf=Function.prototype.apply,Wf=Function.prototype.bind,Mb=ga();m("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Mb[a]=!0});var qg={n:"\n",f:"\f",r:"\r",
t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;
else{var c=a+this.peek(),d=c+this.peek(2),e=Mb[c],f=Mb[d];Mb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||
"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=w(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw da("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=M(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();
if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,
text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=qg[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,
value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var q=function(a,c){this.lexer=a;this.options=c};q.Program="Program";q.ExpressionStatement="ExpressionStatement";q.AssignmentExpression="AssignmentExpression";q.ConditionalExpression="ConditionalExpression";q.LogicalExpression="LogicalExpression";q.BinaryExpression="BinaryExpression";q.UnaryExpression="UnaryExpression";q.CallExpression="CallExpression";q.MemberExpression="MemberExpression";q.Identifier="Identifier";q.Literal=
"Literal";q.ArrayExpression="ArrayExpression";q.Property="Property";q.ObjectExpression="ObjectExpression";q.ThisExpression="ThisExpression";q.NGValueParameter="NGValueParameter";q.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:q.Program,
body:a}},expressionStatement:function(){return{type:q.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:q.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),c,d;return this.expect("?")&&(c=this.expression(),this.consume(":"))?
(d=this.expression(),{type:q.ConditionalExpression,test:a,alternate:c,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:q.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:q.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a={type:q.BinaryExpression,
operator:c.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a={type:q.BinaryExpression,operator:c.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a={type:q.BinaryExpression,operator:c.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a={type:q.BinaryExpression,operator:c.text,
left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:q.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.constants.hasOwnProperty(this.peek().text)?a=fa(this.constants[this.consume().text]):this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():
this.throwError("not a primary expression",this.peek());for(var c;c=this.expect("(","[",".");)"("===c.text?(a={type:q.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===c.text?(a={type:q.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===c.text?a={type:q.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var c={type:q.CallExpression,callee:this.identifier(),
arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return c},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:q.Identifier,name:a.text}},constant:function(){return{type:q.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:q.ArrayExpression,elements:a}},object:function(){var a=[],c;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;c={type:q.Property,kind:"init"};this.peek().constant?c.key=this.constant():this.peek().identifier?c.key=this.identifier():this.throwError("invalid key",this.peek());this.consume(":");c.value=this.expression();a.push(c)}while(this.expect(","))}this.consume("}");return{type:q.ObjectExpression,properties:a}},
throwError:function(a,c){throw da("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},consume:function(a){if(0===this.tokens.length)throw da("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},peekToken:function(){if(0===this.tokens.length)throw da("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];
var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},constants:{"true":{type:q.Literal,value:!0},"false":{type:q.Literal,value:!1},"null":{type:q.Literal,value:null},undefined:{type:q.Literal,value:t},"this":{type:q.ThisExpression}}};rd.prototype={compile:function(a,c){var d=this,e=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:c,fn:{vars:[],body:[],own:{}},assign:{vars:[],
body:[],own:{}},inputs:[]};T(e,d.$filter);var f="",g;this.stage="assign";if(g=pd(e))this.state.computing="assign",f=this.nextId(),this.recurse(g,f),f="fn.assign="+this.generateFunction("assign","s,v,l");g=nd(e.body);d.stage="inputs";m(g,function(a,c){var e="fn"+c;d.state[e]={vars:[],body:[],own:{}};d.state.computing=e;var f=d.nextId();d.recurse(a,f);d.return_(f);d.state.inputs.push(e);a.watchId=c});this.state.computing="fn";this.stage="main";this.recurse(e);f='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+
"var fn="+this.generateFunction("fn","s,l,a,i")+f+this.watchFns()+"return fn;";f=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","ifDefined","plus","text",f))(this.$filter,Ca,oa,ld,Xf,md,a);this.state=this.stage=t;f.literal=qd(e);f.constant=e.constant;return f},USE:"use",STRICT:"strict",watchFns:function(){var a=[],c=this.state.inputs,d=this;m(c,function(c){a.push("var "+c+"="+d.generateFunction(c,"s"))});c.length&&a.push("fn.inputs=["+c.join(",")+"];");return a.join("")},
generateFunction:function(a,c){return"function("+c+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],c=this;m(this.state.filters,function(d,e){a.push(d+"=$filter("+c.escape(e)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,c,d,e,f,g){var h,l,k=this,n,r;e=e||v;if(!g&&w(a.watchId))c=c||this.nextId(),this.if_("i",
this.lazyAssign(c,this.computedMember("i",a.watchId)),this.lazyRecurse(a,c,d,e,f,!0));else switch(a.type){case q.Program:m(a.body,function(c,d){k.recurse(c.expression,t,t,function(a){l=a});d!==a.body.length-1?k.current().body.push(l,";"):k.return_(l)});break;case q.Literal:r=this.escape(a.value);this.assign(c,r);e(r);break;case q.UnaryExpression:this.recurse(a.argument,t,t,function(a){l=a});r=a.operator+"("+this.ifDefined(l,0)+")";this.assign(c,r);e(r);break;case q.BinaryExpression:this.recurse(a.left,
t,t,function(a){h=a});this.recurse(a.right,t,t,function(a){l=a});r="+"===a.operator?this.plus(h,l):"-"===a.operator?this.ifDefined(h,0)+a.operator+this.ifDefined(l,0):"("+h+")"+a.operator+"("+l+")";this.assign(c,r);e(r);break;case q.LogicalExpression:c=c||this.nextId();k.recurse(a.left,c);k.if_("&&"===a.operator?c:k.not(c),k.lazyRecurse(a.right,c));e(c);break;case q.ConditionalExpression:c=c||this.nextId();k.recurse(a.test,c);k.if_(c,k.lazyRecurse(a.alternate,c),k.lazyRecurse(a.consequent,c));e(c);
break;case q.Identifier:c=c||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Ca(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){f&&1!==f&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(c,k.nonComputedMember("s",a.name))})},c&&k.lazyAssign(c,k.nonComputedMember("l",
a.name)));(k.state.expensiveChecks||Fb(a.name))&&k.addEnsureSafeObject(c);e(c);break;case q.MemberExpression:h=d&&(d.context=this.nextId())||this.nextId();c=c||this.nextId();k.recurse(a.object,h,t,function(){k.if_(k.notNull(h),function(){if(a.computed)l=k.nextId(),k.recurse(a.property,l),k.addEnsureSafeMemberName(l),f&&1!==f&&k.if_(k.not(k.computedMember(h,l)),k.lazyAssign(k.computedMember(h,l),"{}")),r=k.ensureSafeObject(k.computedMember(h,l)),k.assign(c,r),d&&(d.computed=!0,d.name=l);else{Ca(a.property.name);
f&&1!==f&&k.if_(k.not(k.nonComputedMember(h,a.property.name)),k.lazyAssign(k.nonComputedMember(h,a.property.name),"{}"));r=k.nonComputedMember(h,a.property.name);if(k.state.expensiveChecks||Fb(a.property.name))r=k.ensureSafeObject(r);k.assign(c,r);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(c,"undefined")});e(c)},!!f);break;case q.CallExpression:c=c||this.nextId();a.filter?(l=k.filter(a.callee.name),n=[],m(a.arguments,function(a){var c=k.nextId();k.recurse(a,c);n.push(c)}),r=l+
"("+n.join(",")+")",k.assign(c,r),e(c)):(l=k.nextId(),h={},n=[],k.recurse(a.callee,l,h,function(){k.if_(k.notNull(l),function(){k.addEnsureSafeFunction(l);m(a.arguments,function(a){k.recurse(a,k.nextId(),t,function(a){n.push(k.ensureSafeObject(a))})});h.name?(k.state.expensiveChecks||k.addEnsureSafeObject(h.context),r=k.member(h.context,h.name,h.computed)+"("+n.join(",")+")"):r=l+"("+n.join(",")+")";r=k.ensureSafeObject(r);k.assign(c,r)},function(){k.assign(c,"undefined")});e(c)}));break;case q.AssignmentExpression:l=
this.nextId();h={};if(!od(a.left))throw da("lval");this.recurse(a.left,t,h,function(){k.if_(k.notNull(h.context),function(){k.recurse(a.right,l);k.addEnsureSafeObject(k.member(h.context,h.name,h.computed));r=k.member(h.context,h.name,h.computed)+a.operator+l;k.assign(c,r);e(c||r)})},1);break;case q.ArrayExpression:n=[];m(a.elements,function(a){k.recurse(a,k.nextId(),t,function(a){n.push(a)})});r="["+n.join(",")+"]";this.assign(c,r);e(r);break;case q.ObjectExpression:n=[];m(a.properties,function(a){k.recurse(a.value,
k.nextId(),t,function(c){n.push(k.escape(a.key.type===q.Identifier?a.key.name:""+a.key.value)+":"+c)})});r="{"+n.join(",")+"}";this.assign(c,r);e(r);break;case q.ThisExpression:this.assign(c,"s");e("s");break;case q.NGValueParameter:this.assign(c,"v"),e("v")}},getHasOwnProperty:function(a,c){var d=a+"."+c,e=this.current().own;e.hasOwnProperty(d)||(e[d]=this.nextId(!1,a+"&&("+this.escape(c)+" in "+a+")"));return e[d]},assign:function(a,c){if(a)return this.current().body.push(a,"=",c,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||
(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,c){return"ifDefined("+a+","+this.escape(c)+")"},plus:function(a,c){return"plus("+a+","+c+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,c,d){if(!0===a)c();else{var e=this.current().body;e.push("if(",a,"){");c();e.push("}");d&&(e.push("else{"),d(),e.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,c){return a+
"."+c},computedMember:function(a,c){return a+"["+c+"]"},member:function(a,c,d){return d?this.computedMember(a,c):this.nonComputedMember(a,c)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+
a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},lazyRecurse:function(a,c,d,e,f,g){var h=this;return function(){h.recurse(a,c,d,e,f,g)}},lazyAssign:function(a,c){var d=this;return function(){d.assign(a,c)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(L(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(V(a))return a.toString();if(!0===a)return"true";
if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw da("esc");},nextId:function(a,c){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(c?"="+c:""));return d},current:function(){return this.state[this.state.computing]}};sd.prototype={compile:function(a,c){var d=this,e=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=c;T(e,d.$filter);var f,g;if(f=pd(e))g=this.recurse(f);f=nd(e.body);var h;f&&(h=[],m(f,function(a,c){var e=d.recurse(a);
a.input=e;h.push(e);a.watchId=c}));var l=[];m(e.body,function(a){l.push(d.recurse(a.expression))});f=0===e.body.length?function(){}:1===e.body.length?l[0]:function(a,c){var d;m(l,function(e){d=e(a,c)});return d};g&&(f.assign=function(a,c,d){return g(a,d,c)});h&&(f.inputs=h);f.literal=qd(e);f.constant=e.constant;return f},recurse:function(a,c,d){var e,f,g=this,h;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case q.Literal:return this.value(a.value,c);case q.UnaryExpression:return f=
this.recurse(a.argument),this["unary"+a.operator](f,c);case q.BinaryExpression:return e=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](e,f,c);case q.LogicalExpression:return e=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](e,f,c);case q.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),c);case q.Identifier:return Ca(a.name,g.expression),g.identifier(a.name,g.expensiveChecks||Fb(a.name),
c,d,g.expression);case q.MemberExpression:return e=this.recurse(a.object,!1,!!d),a.computed||(Ca(a.property.name,g.expression),f=a.property.name),a.computed&&(f=this.recurse(a.property)),a.computed?this.computedMember(e,f,c,d,g.expression):this.nonComputedMember(e,f,g.expensiveChecks,c,d,g.expression);case q.CallExpression:return h=[],m(a.arguments,function(a){h.push(g.recurse(a))}),a.filter&&(f=this.$filter(a.callee.name)),a.filter||(f=this.recurse(a.callee,!0)),a.filter?function(a,d,e,g){for(var m=
[],q=0;q<h.length;++q)m.push(h[q](a,d,e,g));a=f.apply(t,m,g);return c?{context:t,name:t,value:a}:a}:function(a,d,e,r){var m=f(a,d,e,r),q;if(null!=m.value){oa(m.context,g.expression);ld(m.value,g.expression);q=[];for(var t=0;t<h.length;++t)q.push(oa(h[t](a,d,e,r),g.expression));q=oa(m.value.apply(m.context,q),g.expression)}return c?{value:q}:q};case q.AssignmentExpression:return e=this.recurse(a.left,!0,1),f=this.recurse(a.right),function(a,d,h,r){var m=e(a,d,h,r);a=f(a,d,h,r);oa(m.value,g.expression);
m.context[m.name]=a;return c?{value:a}:a};case q.ArrayExpression:return h=[],m(a.elements,function(a){h.push(g.recurse(a))}),function(a,d,e,f){for(var g=[],m=0;m<h.length;++m)g.push(h[m](a,d,e,f));return c?{value:g}:g};case q.ObjectExpression:return h=[],m(a.properties,function(a){h.push({key:a.key.type===q.Identifier?a.key.name:""+a.key.value,value:g.recurse(a.value)})}),function(a,d,e,f){for(var g={},m=0;m<h.length;++m)g[h[m].key]=h[m].value(a,d,e,f);return c?{value:g}:g};case q.ThisExpression:return function(a){return c?
{value:a}:a};case q.NGValueParameter:return function(a,d,e,f){return c?{value:e}:e}}},"unary+":function(a,c){return function(d,e,f,g){d=a(d,e,f,g);d=w(d)?+d:0;return c?{value:d}:d}},"unary-":function(a,c){return function(d,e,f,g){d=a(d,e,f,g);d=w(d)?-d:0;return c?{value:d}:d}},"unary!":function(a,c){return function(d,e,f,g){d=!a(d,e,f,g);return c?{value:d}:d}},"binary+":function(a,c,d){return function(e,f,g,h){var l=a(e,f,g,h);e=c(e,f,g,h);l=md(l,e);return d?{value:l}:l}},"binary-":function(a,c,d){return function(e,
f,g,h){var l=a(e,f,g,h);e=c(e,f,g,h);l=(w(l)?l:0)-(w(e)?e:0);return d?{value:l}:l}},"binary*":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)*c(e,f,g,h);return d?{value:e}:e}},"binary/":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)/c(e,f,g,h);return d?{value:e}:e}},"binary%":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)%c(e,f,g,h);return d?{value:e}:e}},"binary===":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)===c(e,f,g,h);return d?{value:e}:e}},"binary!==":function(a,
c,d){return function(e,f,g,h){e=a(e,f,g,h)!==c(e,f,g,h);return d?{value:e}:e}},"binary==":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)==c(e,f,g,h);return d?{value:e}:e}},"binary!=":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)!=c(e,f,g,h);return d?{value:e}:e}},"binary<":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)<c(e,f,g,h);return d?{value:e}:e}},"binary>":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)>c(e,f,g,h);return d?{value:e}:e}},"binary<=":function(a,c,d){return function(e,
f,g,h){e=a(e,f,g,h)<=c(e,f,g,h);return d?{value:e}:e}},"binary>=":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)>=c(e,f,g,h);return d?{value:e}:e}},"binary&&":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)&&c(e,f,g,h);return d?{value:e}:e}},"binary||":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)||c(e,f,g,h);return d?{value:e}:e}},"ternary?:":function(a,c,d,e){return function(f,g,h,l){f=a(f,g,h,l)?c(f,g,h,l):d(f,g,h,l);return e?{value:f}:f}},value:function(a,c){return function(){return c?
{context:t,name:t,value:a}:a}},identifier:function(a,c,d,e,f){return function(g,h,l,k){g=h&&a in h?h:g;e&&1!==e&&g&&!g[a]&&(g[a]={});h=g?g[a]:t;c&&oa(h,f);return d?{context:g,name:a,value:h}:h}},computedMember:function(a,c,d,e,f){return function(g,h,l,k){var n=a(g,h,l,k),m,s;null!=n&&(m=c(g,h,l,k),Ca(m,f),e&&1!==e&&n&&!n[m]&&(n[m]={}),s=n[m],oa(s,f));return d?{context:n,name:m,value:s}:s}},nonComputedMember:function(a,c,d,e,f,g){return function(h,l,k,n){h=a(h,l,k,n);f&&1!==f&&h&&!h[c]&&(h[c]={});
l=null!=h?h[c]:t;(d||Fb(c))&&oa(l,g);return e?{context:h,name:c,value:l}:l}},inputs:function(a,c){return function(d,e,f,g){return g?g[c]:a(d,e,f)}}};var hc=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d;this.ast=new q(this.lexer);this.astCompiler=d.csp?new sd(this.ast,c):new rd(this.ast,c)};hc.prototype={constructor:hc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};ga();ga();var Yf=Object.prototype.valueOf,Da=J("$sce"),pa={HTML:"html",CSS:"css",URL:"url",
RESOURCE_URL:"resourceUrl",JS:"js"},ea=J("$compile"),X=U.createElement("a"),wd=Ba(O.location.href);xd.$inject=["$document"];Lc.$inject=["$provide"];yd.$inject=["$locale"];Ad.$inject=["$locale"];var Dd=".",hg={yyyy:Y("FullYear",4),yy:Y("FullYear",2,0,!0),y:Y("FullYear",1),MMMM:Hb("Month"),MMM:Hb("Month",!0),MM:Y("Month",2,1),M:Y("Month",1,1),dd:Y("Date",2),d:Y("Date",1),HH:Y("Hours",2),H:Y("Hours",1),hh:Y("Hours",2,-12),h:Y("Hours",1,-12),mm:Y("Minutes",2),m:Y("Minutes",1),ss:Y("Seconds",2),s:Y("Seconds",
1),sss:Y("Milliseconds",3),EEEE:Hb("Day"),EEE:Hb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a,c,d){a=-1*d;return a=(0<=a?"+":"")+(Gb(Math[0<a?"floor":"ceil"](a/60),2)+Gb(Math.abs(a%60),2))},ww:Fd(2),w:Fd(1),G:jc,GG:jc,GGG:jc,GGGG:function(a,c){return 0>=a.getFullYear()?c.ERANAMES[0]:c.ERANAMES[1]}},gg=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,fg=/^\-?\d+$/;zd.$inject=["$locale"];var cg=ra(M),dg=ra(rb);Bd.$inject=
["$parse"];var ie=ra({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===sa.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),sb={};m(Ab,function(a,c){function d(a,d,f){a.$watch(f[e],function(a){f.$set(c,!!a)})}if("multiple"!=a){var e=wa("ng-"+c),f=d;"checked"===a&&(f=function(a,c,f){f.ngModel!==f[e]&&d(a,c,f)});sb[e]=function(){return{restrict:"A",
priority:100,link:f}}}});m(Uc,function(a,c){sb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(jg))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});m(["src","srcset","href"],function(a){var c=wa("ng-"+a);sb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===sa.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",
g=null);f.$observe(c,function(c){c?(f.$set(h,c),Ua&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Ib={$addControl:v,$$renameControl:function(a,c){a.$name=c},$removeControl:v,$setValidity:v,$setDirty:v,$setPristine:v,$setSubmitted:v};Gd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Od=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:Gd,compile:function(d,e){d.addClass(Va).addClass(mb);var f=e.name?"name":a&&e.ngForm?"ngForm":
!1;return{pre:function(a,d,e,k){if(!("action"in e)){var n=function(c){a.$apply(function(){k.$commitViewValue();k.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",n,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",n,!1)},0,!1)})}var m=k.$$parentForm;f&&(Eb(a,k.$name,k,k.$name),e.$observe(f,function(c){k.$name!==c&&(Eb(a,k.$name,t,k.$name),m.$$renameControl(k,c),Eb(a,k.$name,k,k.$name))}));d.on("$destroy",function(){m.$removeControl(k);f&&Eb(a,e[f],t,
k.$name);P(k,Ib)})}}}}}]},je=Od(),we=Od(!0),ig=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,rg=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,sg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,tg=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Pd=/^(\d{4})-(\d{2})-(\d{2})$/,Qd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,mc=/^(\d{4})-W(\d\d)$/,Rd=/^(\d{4})-(\d\d)$/,
Sd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Td={text:function(a,c,d,e,f,g){kb(a,c,d,e,f,g);kc(e)},date:lb("date",Pd,Kb(Pd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":lb("datetimelocal",Qd,Kb(Qd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:lb("time",Sd,Kb(Sd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:lb("week",mc,function(a,c){if(aa(a))return a;if(L(a)){mc.lastIndex=0;var d=mc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=Ed(e),f=7*(f-1);c&&(d=c.getHours(),g=
c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:lb("month",Rd,Kb(Rd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){Id(a,c,d,e);kb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:tg.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!V(a))throw Lb("numfmt",a);a=a.toString()}return a});if(w(d.min)||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||
A(h)||a>=h};d.$observe("min",function(a){w(a)&&!V(a)&&(a=parseFloat(a,10));h=V(a)&&!isNaN(a)?a:t;e.$validate()})}if(w(d.max)||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||A(l)||a<=l};d.$observe("max",function(a){w(a)&&!V(a)&&(a=parseFloat(a,10));l=V(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){kb(a,c,d,e,f,g);kc(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||rg.test(d)}},email:function(a,c,d,e,f,g){kb(a,c,d,e,f,g);kc(e);
e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||sg.test(d)}},radio:function(a,c,d,e){A(d.name)&&c.attr("name",++nb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=Jd(l,a,"ngTrueValue",d.ngTrueValue,!0),n=Jd(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&
a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ka(a,k)});e.$parsers.push(function(a){return a?k:n})},hidden:v,button:v,submit:v,reset:v,file:v},Fc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Td[M(h.type)]||Td.text)(f,g,h,l[0],c,a,d,e)}}}}],ug=/^(true|false|\d+)$/,Oe=function(){return{restrict:"A",priority:100,compile:function(a,
c){return ug.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},oe=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],qe=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));
c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],pe=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],Ne=ra({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
re=lc("",!0),te=lc("Odd",0),se=lc("Even",1),ue=Ma({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),ve=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Kc={},vg={blur:!0,focus:!0};m("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=wa("ng-"+a);Kc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=
d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};vg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ye=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=
qb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],ze=["$templateRequest","$anchorScroll","$animate",function(a,c,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ca.noop,compile:function(e,f){var g=f.ngInclude||f.src,h=f.onload||"",l=f.autoscroll;return function(e,f,m,s,q){var t=0,F,u,p,v=function(){u&&(u.remove(),u=null);F&&(F.$destroy(),F=null);p&&(d.leave(p).then(function(){u=null}),u=p,p=null)};e.$watch(g,function(g){var m=function(){!w(l)||l&&!e.$eval(l)||
c()},r=++t;g?(a(g,!0).then(function(a){if(r===t){var c=e.$new();s.template=a;a=q(c,function(a){v();d.enter(a,null,f).then(m)});F=c;p=a;F.$emit("$includeContentLoaded",g);e.$eval(h)}},function(){r===t&&(v(),e.$emit("$includeContentError",g))}),e.$emit("$includeContentRequested",g)):(v(),s.template=null)})}}}}],Qe=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Nc(f.template,U).childNodes)(c,function(a){d.append(a)},
{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],Ae=Ma({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),Me=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?R(f):f;e.$parsers.push(function(a){if(!A(a)){var c=[];a&&m(a.split(h),function(a){a&&c.push(g?R(a):a)});return c}});e.$formatters.push(function(a){return G(a)?a.join(f):t});e.$isEmpty=function(a){return!a||
!a.length}}}},mb="ng-valid",Kd="ng-invalid",Va="ng-pristine",Jb="ng-dirty",Md="ng-pending",Lb=new J("ngModel"),wg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,n){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=t;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=
!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=n(d.name||"",!1)(a);var r=f(d.ngModel),s=r.assign,q=r,C=s,F=null,u,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");q=function(a){var d=r(a);z(d)&&(d=c(a));return d};C=function(a,c){z(r(a))?g(a,{$$$p:p.$modelValue}):s(a,p.$modelValue)}}else if(!r.assign)throw Lb("nonassign",d.ngModel,ua(e));};this.$render=v;this.$isEmpty=function(a){return A(a)||
""===a||null===a||a!==a};var K=e.inheritedData("$formController")||Ib,y=0;Hd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:K,$animate:g});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;g.removeClass(e,Jb);g.addClass(e,Va)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;g.removeClass(e,Va);g.addClass(e,Jb);K.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=
function(){p.$touched=!0;p.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(F);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!V(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,c=p.$valid,d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,function(f){e||c===f||(p.$modelValue=f?a:t,p.$modelValue!==d&&p.$$writeModelToScope())})}};this.$$runValidators=
function(a,c,d){function e(){var d=!0;m(p.$validators,function(e,f){var h=e(a,c);d=d&&h;g(f,h)});return d?!0:(m(p.$asyncValidators,function(a,c){g(c,null)}),!1)}function f(){var d=[],e=!0;m(p.$asyncValidators,function(f,h){var k=f(a,c);if(!k||!z(k.then))throw Lb("$asyncValidators",k);g(h,t);d.push(k.then(function(){g(h,!0)},function(a){e=!1;g(h,!1)}))});d.length?k.all(d).then(function(){h(e)},v):h(!0)}function g(a,c){l===y&&p.$setValidity(a,c)}function h(a){l===y&&d(a)}y++;var l=y;(function(){var a=
p.$$parserName||"parse";if(u===t)g(a,null);else return u||(m(p.$validators,function(a,c){g(c,null)}),m(p.$asyncValidators,function(a,c){g(c,null)})),g(a,u),u;return!0})()?e()?f():h(!1):h(!1)};this.$commitViewValue=function(){var a=p.$viewValue;h.cancel(F);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=p.$$lastCommittedViewValue;if(u=A(c)?t:!0)for(var d=
0;d<p.$parsers.length;d++)if(c=p.$parsers[d](c),A(c)){u=!1;break}V(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=q(a));var e=p.$modelValue,f=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=c;f&&(p.$modelValue=c,p.$modelValue!==e&&p.$$writeModelToScope());p.$$runValidators(c,p.$$lastCommittedViewValue,function(a){f||(p.$modelValue=a?c:t,p.$modelValue!==e&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){C(a,p.$modelValue);m(p.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};
this.$setViewValue=function(a,c){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=p.$options;e&&w(e.debounce)&&(e=e.debounce,V(e)?d=e:V(e[c])?d=e[c]:V(e["default"])&&(d=e["default"]));h.cancel(F);d?F=h(function(){p.$commitViewValue()},d):l.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var c=q(a);if(c!==p.$modelValue&&(p.$modelValue===p.$modelValue||c===c)){p.$modelValue=
p.$$rawModelValue=c;u=t;for(var d=p.$formatters,e=d.length,f=c;e--;)f=d[e](f);p.$viewValue!==f&&(p.$viewValue=p.$$lastCommittedViewValue=f,p.$render(),p.$$runValidators(c,f,v))}return c})}],Le=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:wg,priority:1,compile:function(c){c.addClass(Va).addClass("ng-untouched").addClass(mb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Ib;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",
function(a){h.$name!==a&&l.$$renameControl(h,a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],xg=/(\s+|^)default(\s+|$)/,Pe=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=fa(a.$eval(c.ngModelOptions));
this.$options.updateOn!==t?(this.$options.updateOnDefault=!1,this.$options.updateOn=R(this.$options.updateOn.replace(xg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Be=Ma({terminal:!0,priority:1E3}),yg=J("ngOptions"),zg=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
Je=["$compile","$parse",function(a,c){function d(a,d,e){function f(a,c,d,e,g){this.selectValue=a;this.viewValue=c;this.label=d;this.group=e;this.disabled=g}function n(a){var c;if(!q&&Ea(a))c=a;else{c=[];for(var d in a)a.hasOwnProperty(d)&&"$"!==d.charAt(0)&&c.push(d)}return c}var m=a.match(zg);if(!m)throw yg("iexp",a,ua(d));var s=m[5]||m[7],q=m[6];a=/ as /.test(m[0])&&m[1];var t=m[9];d=c(m[2]?m[1]:s);var v=a&&c(a)||d,u=t&&c(t),p=t?function(a,c){return u(e,c)}:function(a){return Ga(a)},w=function(a,
c){return p(a,z(a,c))},y=c(m[2]||m[1]),A=c(m[3]||""),B=c(m[4]||""),N=c(m[8]),D={},z=q?function(a,c){D[q]=c;D[s]=a;return D}:function(a){D[s]=a;return D};return{trackBy:t,getTrackByValue:w,getWatchables:c(N,function(a){var c=[];a=a||[];for(var d=n(a),f=d.length,g=0;g<f;g++){var h=a===d?g:d[g],k=z(a[h],h),h=p(a[h],k);c.push(h);if(m[2]||m[1])h=y(e,k),c.push(h);m[4]&&(k=B(e,k),c.push(k))}return c}),getOptions:function(){for(var a=[],c={},d=N(e)||[],g=n(d),h=g.length,m=0;m<h;m++){var r=d===g?m:g[m],s=
z(d[r],r),q=v(e,s),r=p(q,s),u=y(e,s),x=A(e,s),s=B(e,s),q=new f(r,q,u,x,s);a.push(q);c[r]=q}return{items:a,selectValueMap:c,getOptionFromViewValue:function(a){return c[w(a)]},getViewValueFromOption:function(a){return t?ca.copy(a.viewValue):a.viewValue}}}}}var e=U.createElement("option"),f=U.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","?ngModel"],link:function(c,h,l,k){function n(a,c){a.element=c;c.disabled=a.disabled;a.value!==c.value&&(c.value=a.selectValue);a.label!==
c.label&&(c.label=a.label,c.textContent=a.label)}function r(a,c,d,e){c&&M(c.nodeName)===d?d=c:(d=e.cloneNode(!1),c?a.insertBefore(d,c):a.appendChild(d));return d}function s(a){for(var c;a;)c=a.nextSibling,Xb(a),a=c}function q(a){var c=p&&p[0],d=N&&N[0];if(c||d)for(;a&&(a===c||a===d);)a=a.nextSibling;return a}function t(){var a=D&&u.readValue();D=z.getOptions();var c={},d=h[0].firstChild;B&&h.prepend(p);d=q(d);D.items.forEach(function(a){var g,k;a.group?(g=c[a.group],g||(g=r(h[0],d,"optgroup",f),d=
g.nextSibling,g.label=a.group,g=c[a.group]={groupElement:g,currentOptionElement:g.firstChild}),k=r(g.groupElement,g.currentOptionElement,"option",e),n(a,k),g.currentOptionElement=k.nextSibling):(k=r(h[0],d,"option",e),n(a,k),d=k.nextSibling)});Object.keys(c).forEach(function(a){s(c[a].currentOptionElement)});s(d);v.$render();if(!v.$isEmpty(a)){var g=u.readValue();(z.trackBy?ka(a,g):a===g)||(v.$setViewValue(g),v.$render())}}var v=k[1];if(v){var u=k[0];k=l.multiple;for(var p,w=0,A=h.children(),I=A.length;w<
I;w++)if(""===A[w].value){p=A.eq(w);break}var B=!!p,N=y(e.cloneNode(!1));N.val("?");var D,z=d(l.ngOptions,h,c);k?(v.$isEmpty=function(a){return!a||0===a.length},u.writeValue=function(a){D.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){(a=D.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},u.readValue=function(){var a=h.val()||[],c=[];m(a,function(a){a=D.selectValueMap[a];a.disabled||c.push(D.getViewValueFromOption(a))});return c},z.trackBy&&c.$watchCollection(function(){if(G(v.$viewValue))return v.$viewValue.map(function(a){return z.getTrackByValue(a)})},
function(){v.$render()})):(u.writeValue=function(a){var c=D.getOptionFromViewValue(a);c&&!c.disabled?h[0].value!==c.selectValue&&(N.remove(),B||p.remove(),h[0].value=c.selectValue,c.element.selected=!0,c.element.setAttribute("selected","selected")):null===a||B?(N.remove(),B||h.prepend(p),h.val(""),p.prop("selected",!0),p.attr("selected",!0)):(B||p.remove(),h.prepend(N),h.val("?"),N.prop("selected",!0),N.attr("selected",!0))},u.readValue=function(){var a=D.selectValueMap[h.val()];return a&&!a.disabled?
(B||p.remove(),N.remove(),D.getViewValueFromOption(a)):null},z.trackBy&&c.$watch(function(){return z.getTrackByValue(v.$viewValue)},function(){v.$render()}));B?(p.remove(),a(p)(c),p.removeClass("ng-scope")):p=y(e.cloneNode(!1));t();c.$watchCollection(z.getWatchables,t)}}}}],Ce=["$locale","$interpolate","$log",function(a,c,d){var e=/{}/g,f=/^when(Minus)?(.+)$/;return{link:function(g,h,l){function k(a){h.text(a||"")}var n=l.count,r=l.$attr.when&&h.attr(l.$attr.when),s=l.offset||0,q=g.$eval(r)||{},t=
{},w=c.startSymbol(),u=c.endSymbol(),p=w+n+"-"+s+u,y=ca.noop,z;m(l,function(a,c){var d=f.exec(c);d&&(d=(d[1]?"-":"")+M(d[2]),q[d]=h.attr(l.$attr[c]))});m(q,function(a,d){t[d]=c(a.replace(e,p))});g.$watch(n,function(c){var e=parseFloat(c),f=isNaN(e);f||e in q||(e=a.pluralCat(e-s));e===z||f&&V(z)&&isNaN(z)||(y(),f=t[e],A(f)?(null!=c&&d.debug("ngPluralize: no rule defined for '"+e+"' in "+r),y=v,k()):y=g.$watch(f,k),z=e)})}}}],De=["$parse","$animate",function(a,c){var d=J("ngRepeat"),e=function(a,c,
d,e,k,m,r){a[d]=e;k&&(a[k]=m);a.$index=c;a.$first=0===c;a.$last=c===r-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=U.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var n=k[1],r=k[2],s=k[3],q=k[4],k=n.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
if(!k)throw d("iidexp",n);var v=k[3]||k[1],w=k[2];if(s&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(s)))throw d("badident",s);var u,p,z,A,I={$id:Ga};q?u=a(q):(z=function(a,c){return Ga(c)},A=function(a){return a});return function(a,f,g,k,n){u&&(p=function(c,d,e){w&&(I[w]=c);I[v]=d;I.$index=e;return u(a,I)});var q=ga();a.$watchCollection(r,function(g){var k,r,u=f[0],x,D=ga(),I,H,L,G,M,J,O;s&&(a[s]=g);if(Ea(g))M=
g,r=p||z;else for(O in r=p||A,M=[],g)g.hasOwnProperty(O)&&"$"!==O.charAt(0)&&M.push(O);I=M.length;O=Array(I);for(k=0;k<I;k++)if(H=g===M?k:M[k],L=g[H],G=r(H,L,k),q[G])J=q[G],delete q[G],D[G]=J,O[k]=J;else{if(D[G])throw m(O,function(a){a&&a.scope&&(q[a.id]=a)}),d("dupes",h,G,L);O[k]={id:G,scope:t,clone:t};D[G]=!0}for(x in q){J=q[x];G=qb(J.clone);c.leave(G);if(G[0].parentNode)for(k=0,r=G.length;k<r;k++)G[k].$$NG_REMOVED=!0;J.scope.$destroy()}for(k=0;k<I;k++)if(H=g===M?k:M[k],L=g[H],J=O[k],J.scope){x=
u;do x=x.nextSibling;while(x&&x.$$NG_REMOVED);J.clone[0]!=x&&c.move(qb(J.clone),null,y(u));u=J.clone[J.clone.length-1];e(J.scope,k,v,L,w,H,I)}else n(function(a,d){J.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,null,y(u));u=f;J.clone=a;D[J.id]=J;e(J.scope,k,v,L,w,H,I)});q=D})}}}}],Ee=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],xe=["$animate",
function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Fe=Ma(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&m(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Ge=["$animate",function(a){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],n=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||
e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var q=qb(h[d].clone);k[d].$destroy();(l[d]=a.leave(q)).then(n(l,d))}h.length=0;k.length=0;(g=f.cases["!"+c]||f.cases["?"])&&m(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=U.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],He=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,
f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),Ie=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),Ke=Ma({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw J("ngTransclude")("orphan",ua(c));f(function(a){c.empty();c.append(a)})}}),ke=["$templateCache",function(a){return{restrict:"E",terminal:!0,
compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Ag={$setViewValue:v,$render:v},Bg=["$element","$scope","$attrs",function(a,c,d){var e=this,f=new Sa;e.ngModelCtrl=Ag;e.unknownOption=y(U.createElement("option"));e.renderUnknownOption=function(c){c="? "+Ga(c)+" ?";e.unknownOption.val(c);a.prepend(e.unknownOption);a.val(c)};c.$on("$destroy",function(){e.renderUnknownOption=v});e.removeUnknownOption=function(){e.unknownOption.parent()&&e.unknownOption.remove()};e.readValue=
function(){e.removeUnknownOption();return a.val()};e.writeValue=function(c){e.hasOption(c)?(e.removeUnknownOption(),a.val(c),""===c&&e.emptyOption.prop("selected",!0)):null==c&&e.emptyOption?(e.removeUnknownOption(),a.val("")):e.renderUnknownOption(c)};e.addOption=function(a,c){Ra(a,'"option value"');""===a&&(e.emptyOption=c);var d=f.get(a)||0;f.put(a,d+1)};e.removeOption=function(a){var c=f.get(a);c&&(1===c?(f.remove(a),""===a&&(e.emptyOption=t)):f.put(a,c-1))};e.hasOption=function(a){return!!f.get(a)}}],
le=function(){return{restrict:"E",require:["select","?ngModel"],controller:Bg,link:function(a,c,d,e){var f=e[1];if(f){var g=e[0];g.ngModelCtrl=f;f.$render=function(){g.writeValue(f.$viewValue)};c.on("change",function(){a.$apply(function(){f.$setViewValue(g.readValue())})});if(d.multiple){g.readValue=function(){var a=[];m(c.find("option"),function(c){c.selected&&a.push(c.value)});return a};g.writeValue=function(a){var d=new Sa(a);m(c.find("option"),function(a){a.selected=w(d.get(a.value))})};var h,
l=NaN;a.$watch(function(){l!==f.$viewValue||ka(h,f.$viewValue)||(h=ia(f.$viewValue),f.$render());l=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}}}},ne=["$interpolate",function(a){function c(a){a[0].hasAttribute("selected")&&(a[0].selected=!0)}return{restrict:"E",priority:100,compile:function(d,e){if(A(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.ngModelCtrl&&
(f?a.$watch(f,function(a,f){e.$set("value",a);f!==a&&m.removeOption(f);m.addOption(a,d);m.ngModelCtrl.$render();c(d)}):(m.addOption(e.value,d),m.ngModelCtrl.$render(),c(d)),d.on("$destroy",function(){m.removeOption(e.value);m.ngModelCtrl.$render()}))}}}}],me=ra({restrict:"E",terminal:!1}),Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},
Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){L(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw J("ngPattern")("noregexp",g,a,ua(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||A(f)||f.test(a)}}}}},Jc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=W(a);f=isNaN(a)?-1:a;e.$validate()});
e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(c)||c.length<=f}}}}},Ic=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=W(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}};O.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(ce(),ee(ca),y(U).ready(function(){Zd(U,Ac)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map
;
angular.module('pageslide-directive', [])

.directive('pageslide', ['$document', '$timeout',
    function ($document, $timeout) {
        var defaults = {};

        return {
            restrict: 'EAC',
            transclude: false,
            scope: {
                psOpen: '=?',
                psAutoClose: '=?',
                psSide: '@',
                psSpeed: '@',
                psClass: '@',
                psSize: '@',
                psSqueeze: '@',
                psCloak: '@',
                psPush: '@',
                psContainer: '@',
                psKeyListener: '@',
                psBodyClass: '@'
            },
            link: function ($scope, el, attrs) {

                /* Inspect */

                //console.log($scope);
                //console.log(el);
                //console.log(attrs);

                var param = {};

                param.side = $scope.psSide || 'right';
                param.speed = $scope.psSpeed || '0.5';
                param.size = $scope.psSize || '300px';
                param.zindex = 1000; // Override with custom CSS
                param.className = $scope.psClass || 'ng-pageslide';
                param.cloak = $scope.psCloak && $scope.psCloak.toLowerCase() == 'false' ? false : true;
                param.squeeze = Boolean($scope.psSqueeze) || false;
                param.push = Boolean($scope.psPush) || false;
                param.container = $scope.psContainer || false;
                param.keyListener = Boolean($scope.psKeyListener) || false;
                param.bodyClass = $scope.psBodyClass || false;

                el.addClass(param.className);

                /* DOM manipulation */

                var content = null;
                var slider = null;
                var body = param.container ? document.getElementById(param.container) : document.body;

                // TODO verify that we are meaning to use the param.className and not the param.bodyClass

                function setBodyClass(value){
                    if (param.bodyClass) {
                        var bodyClass = param.className + '-body';
                        var bodyClassRe = new RegExp(' ' + bodyClass + '-closed| ' + bodyClass + '-open');
                        body.className = body.className.replace(bodyClassRe, '');
                        body.className += ' ' + bodyClass + '-' + value;
                    }
                }

                setBodyClass('closed');

                slider = el[0];

                // Check for div tag
                if (slider.tagName.toLowerCase() !== 'div' &&
                    slider.tagName.toLowerCase() !== 'pageslide')
                    throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');

                // Check for content
                if (slider.children.length === 0)
                    throw new Error('You have to content inside the <pageslide>');

                content = angular.element(slider.children);

                /* Append */
                body.appendChild(slider);

                /* Style setup */
                slider.style.zIndex = param.zindex;
                slider.style.position = param.container !== false ? 'absolute' : 'fixed';
                slider.style.width = 0;
                //slider.style.height = 0;
                //slider.style.overflow = 'hidden';
                slider.style.transitionDuration = param.speed + 's';
                slider.style.webkitTransitionDuration = param.speed + 's';
                slider.style.transitionProperty = 'width, height';

                if (param.squeeze) {
                    body.style.position = 'absolute';
                    body.style.transitionDuration = param.speed + 's';
                    body.style.webkitTransitionDuration = param.speed + 's';
                    body.style.transitionProperty = 'top, bottom, left, right';
                }

                switch (param.side) {
                    case 'right':
                        //slider.style.height = attrs.psCustomHeight || '100%';
                        slider.style.top = attrs.psCustomTop || '0px';
                        //slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'left':
                        slider.style.height = attrs.psCustomHeight || '100%';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        break;
                    case 'top':
                        slider.style.width = attrs.psCustomWidth || '100%';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.top = attrs.psCustomTop || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                    case 'bottom':
                        slider.style.width = attrs.psCustomWidth || '100%';
                        slider.style.bottom = attrs.psCustomBottom || '0px';
                        slider.style.left = attrs.psCustomLeft || '0px';
                        slider.style.right = attrs.psCustomRight || '0px';
                        break;
                }


                /* Closed */
                function psClose(slider, param) {
                    if (slider && slider.style.width !== 0) {
                        if (param.cloak) content.css('display', 'none');
                        switch (param.side) {
                            case 'right':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.right = '0px';
                                if (param.push) {
                                    body.style.right = '0px';
                                    body.style.left = '0px';
                                }
                                break;
                            case 'left':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.left = '0px';
                                if (param.push) {
                                    body.style.left = '0px';
                                    body.style.right = '0px';
                                }
                                break;
                            case 'top':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.top = '0px';
                                if (param.push) {
                                    body.style.top = '0px';
                                    body.style.bottom = '0px';
                                }
                                break;
                            case 'bottom':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.bottom = '0px';
                                if (param.push) {
                                    body.style.bottom = '0px';
                                    body.style.top = '0px';
                                }
                                break;
                        }
                    }
                    $scope.psOpen = false;

                    if (param.keyListener) {
                        $document.off('keydown', keyListener);
                    }

                    setBodyClass('closed');
                }

                /* Open */
                function psOpen(slider, param) {
                    if (slider.style.width !== 0) {
                        switch (param.side) {
                            case 'right':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.right = param.size;
                                if (param.push) {
                                    body.style.right = param.size;
                                    body.style.left = '-' + param.size;
                                }
                                break;
                            case 'left':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.left = param.size;
                                if (param.push) {
                                    body.style.left = param.size;
                                    body.style.right = '-' + param.size;
                                }
                                break;
                            case 'top':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.top = param.size;
                                if (param.push) {
                                    body.style.top = param.size;
                                    body.style.bottom = '-' + param.size;
                                }
                                break;
                            case 'bottom':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.bottom = param.size;
                                if (param.push) {
                                    body.style.bottom = param.size;
                                    body.style.top = '-' + param.size;
                                }
                                break;
                        }

                        $timeout(function() {
                            if (param.cloak) content.css('display', 'block');
                        }, (param.speed * 1000));

                        $scope.psOpen = true;

                        if (param.keyListener) {
                            $document.on('keydown', keyListener);
                        }

                        setBodyClass('open');
                    }
                }

                function isFunction(functionToCheck) {
                    var getType = {};
                    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                }

                /*
                * Close the sidebar if the 'esc' key is pressed
                * */

                function keyListener(e) {
                    var ESC_KEY = 27;
                    var key = e.keyCode || e.which;

                    if (key === ESC_KEY) {
                        psClose(slider, param);
                    }
                }

                /*
                * Watchers
                * */

                $scope.$watch('psOpen', function(value) {
                    if (!!value) {
                        psOpen(slider, param);
                    } else {
                        psClose(slider, param);
                    }
                });

                $scope.$watch('psSize', function(newValue, oldValue) {
                    if (oldValue !== newValue) {
                        param.size = newValue;
                        psOpen(slider, param);
                    }
                });

                /*
                * Events
                * */

                $scope.$on('$destroy', function () {
                    body.removeChild(slider);
                });

                if ($scope.psAutoClose) {
                    $scope.$on('$locationChangeStart', function() {
                        psClose(slider, param);
                    });
                    $scope.$on('$stateChangeStart', function() {
                        psClose(slider, param);
                    });

                }
            }
        };
    }
]);
;
/**
 * State-based routing for AngularJS
 * @version v0.2.18
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return R(new(R(function(){},{prototype:a})),b)}function e(a){return Q(arguments,function(b){b!==a&&Q(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var b=[];return Q(a,function(a,c){b.push(c)}),b}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l]&&i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return R({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return Q(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));return Q(c,function(c){c in a&&(b[c]=a[c])}),b}function m(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function n(a,b){var c=P(a),d=c?[]:{};return Q(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function o(a,b){var c=P(a)?[]:{};return Q(a,function(a,d){c[d]=b(a,d)}),c}function p(a,b){var d=1,f=2,i={},j=[],k=i,l=R(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,N(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);Q(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return O(a)&&a.then&&a.$$promises}if(!O(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return Q(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!L(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;Q(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!O(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=l;var n=a.defer(),r=n.promise,s=r.$$promises={},t=R({},d),u=1+q.length/3,v=!1;if(L(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,m(f.$$inheritedValues,p)),R(s,f.$$promises),f.$$values?(v=e(t,m(f.$$values,p)),r.$$inheritedValues=m(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=m(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function q(a,b,c){this.fromConfig=function(a,b,c){return L(a.template)?this.fromString(a.template,b):L(a.templateUrl)?this.fromUrl(a.templateUrl,b):L(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return M(a)?a(b):a},this.fromUrl=function(c,d){return M(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function r(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+([-.]+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new U.Param(b,c,d,e),p[b]}function g(a,b,c,d){var e=["",""],f=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return f;switch(c){case!1:e=["(",")"+(d?"?":"")];break;case!0:f=f.replace(/\/$/,""),e=["(?:/(",")|/)?"];break;default:e=["("+c+"|",")?"]}return f+e[0]+b+e[1]}function h(e,f){var g,h,i,j,k;return g=e[2]||e[3],k=b.params[g],i=a.substring(m,e.index),h=f?e[4]:e[4]||("*"==e[1]?".*":null),h&&(j=U.type(h)||d(U.type("string"),{pattern:new RegExp(h,b.caseInsensitive?"i":c)})),{id:g,regexp:h,segment:i,type:j,cfg:k}}b=R({params:{}},O(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new U.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash,s.isOptional),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function s(a){R(this,a)}function t(){function a(a){return null!=a?a.toString().replace(/~/g,"~~").replace(/\//g,"~2F"):a}function e(a){return null!=a?a.toString().replace(/~2F/g,"/").replace(/~~/g,"~"):a}function f(){return{strict:p,caseInsensitive:m}}function i(a){return M(a)||P(a)&&M(a[a.length-1])}function j(){for(;w.length;){var a=w.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(u[a.name],l.invoke(a.def))}}function k(a){R(this,a||{})}U=this;var l,m=!1,p=!0,q=!1,u={},v=!0,w=[],x={string:{encode:a,decode:e,is:function(a){return null==a||!L(a)||"string"==typeof a},pattern:/[^\/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return L(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^\/]*/},any:{encode:b.identity,decode:b.identity,equals:b.equals,pattern:/.*/}};t.$$getDefaultValue=function(a){if(!i(a.value))return a.value;if(!l)throw new Error("Injectable functions cannot be called at configuration time");return l.invoke(a.value)},this.caseInsensitive=function(a){return L(a)&&(m=a),m},this.strictMode=function(a){return L(a)&&(p=a),p},this.defaultSquashPolicy=function(a){if(!L(a))return q;if(a!==!0&&a!==!1&&!N(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return q=a,a},this.compile=function(a,b){return new r(a,R(f(),b))},this.isMatcher=function(a){if(!O(a))return!1;var b=!0;return Q(r.prototype,function(c,d){M(c)&&(b=b&&L(a[d])&&M(a[d]))}),b},this.type=function(a,b,c){if(!L(b))return u[a];if(u.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return u[a]=new s(R({name:a},b)),c&&(w.push({name:a,def:c}),v||j()),this},Q(x,function(a,b){u[b]=new s(R({name:b},a))}),u=d(u,{}),this.$get=["$injector",function(a){return l=a,v=!1,j(),Q(x,function(a,b){u[b]||(u[b]=new s(a))}),this}],this.Param=function(a,d,e,f){function j(a){var b=O(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=i(a.value)?a.value:function(){return a.value},a}function k(c,d,e){if(c.type&&d)throw new Error("Param '"+a+"' has two type configurations.");return d?d:c.type?b.isString(c.type)?u[c.type]:c.type instanceof s?c.type:new s(c.type):"config"===e?u.any:u.string}function m(){var b={array:"search"===f?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return R(b,c,e).array}function p(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!L(c)||null==c)return q;if(c===!0||N(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function r(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=P(a.replace)?a.replace:[],N(e)&&f.push({from:e,to:c}),g=o(f,function(a){return a.from}),n(i,function(a){return-1===h(g,a.from)}).concat(f)}function t(){if(!l)throw new Error("Injectable functions cannot be called at configuration time");var a=l.invoke(e.$$fn);if(null!==a&&a!==c&&!x.type.is(a))throw new Error("Default value ("+a+") for parameter '"+x.id+"' is not an instance of Type ("+x.type.name+")");return a}function v(a){function b(a){return function(b){return b.from===a}}function c(a){var c=o(n(x.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),L(a)?x.type.$normalize(a):t()}function w(){return"{Param:"+a+" "+d+" squash: '"+A+"' optional: "+z+"}"}var x=this;e=j(e),d=k(e,d,f);var y=m();d=y?d.$asArray(y,"search"===f):d,"string"!==d.name||y||"path"!==f||e.value!==c||(e.value="");var z=e.value!==c,A=p(e,z),B=r(e,y,z,A);R(this,{id:a,type:d,location:f,array:y,squash:A,replace:B,isOptional:z,value:v,dynamic:c,config:e,toString:w})},k.prototype={$$new:function(){return d(this,R(new k,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(k.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),Q(b,function(b){Q(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return Q(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return Q(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var d,e,f,g,h,i=this.$$keys();for(d=0;d<i.length&&(e=this[i[d]],f=a[i[d]],f!==c&&null!==f||!e.isOptional);d++){if(g=e.type.$normalize(f),!e.type.is(g))return!1;if(h=e.type.encode(g),b.isString(h)&&!e.type.pattern.exec(h))return!1}return!0},$$parent:c},this.ParamSet=k}function u(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return L(d)?d:!0}function h(d,e,f,g,h){function m(a,b,c){return"/"===q?a:b?q.slice(0,-1)+a:c?q.slice(1)+a:a}function n(a){function b(a){var b=a(f,d);return b?(N(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){p&&d.url()===p;p=c;var e,g=j.length;for(e=0;g>e;e++)if(b(j[e]))return;k&&b(k)}}function o(){return i=i||e.$on("$locationChangeSuccess",n)}var p,q=g.baseHref(),r=d.url();return l||o(),{sync:function(){n()},listen:function(){return o()},update:function(a){return a?void(r=d.url()):void(d.url()!==r&&(d.url(r),d.replace()))},push:function(a,b,e){var f=a.format(b||{});null!==f&&b&&b["#"]&&(f+="#"+b["#"]),d.url(f),p=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled),g=g&&h.history;var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),null!==i&&e&&e["#"]&&(i+="#"+e["#"]),i=m(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!M(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(N(a)){var b=a;a=function(){return b}}else if(!M(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=N(b);if(N(a)&&(a=d.compile(a)),!h&&!M(b)&&!P(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),R(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:N(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),R(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser","$sniffer"]}function v(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function m(a,b){if(!a)return c;var d=N(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=m(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var l=z[e];return!l||!d&&(d||l!==a&&l.self!==a)?c:l}function n(a,b){A[a]||(A[a]=[]),A[a].push(b)}function p(a){for(var b=A[a]||[];b.length;)q(b.shift())}function q(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!N(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(z.hasOwnProperty(c))throw new Error("State '"+c+"' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):N(b.parent)?b.parent:O(b.parent)&&N(b.parent.name)?b.parent.name:"";if(e&&!z[e])return n(e,b.self);for(var f in C)M(C[f])&&(b[f]=C[f](b,C.$delegates[f]));return z[c]=b,!b[B]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){y.$current.navigable==b&&j(a,c)||y.transitionTo(b,a,{inherit:!0,location:!1})}]),p(c),b}function r(a){return a.indexOf("*")>-1}function s(a){for(var b=a.split("."),c=y.$current.name.split("."),d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return"**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length?!1:c.join("")===b.join("")}function t(a,b){return N(a)&&!L(b)?C[a]:M(b)&&N(a)?(C[a]&&!C.$delegates[a]&&(C.$delegates[a]=C[a]),C[a]=b,this):this}function u(a,b){return O(a)?b=a:b.name=a,q(b),this}function v(a,e,f,h,l,n,p,q,t){function u(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),D;if(!g.retry)return null;if(f.$retry)return p.update(),E;var h=y.transition=e.when(g.retry);return h.then(function(){return h!==y.transition?A:(b.options.$retry=!0,y.transitionTo(b.to,b.toParams,b.options))},function(){return D}),p.update(),h}function v(a,c,d,g,i,j){function m(){var c=[];return Q(a.views,function(d,e){var g=d.resolve&&d.resolve!==a.resolve?d.resolve:{};g.$template=[function(){return f.load(e,{view:d,locals:i.globals,params:n,notify:j.notify})||""}],c.push(l.resolve(g,i.globals,i.resolve,a).then(function(c){if(M(d.controllerProvider)||P(d.controllerProvider)){var f=b.extend({},g,i.globals);c.$$controller=h.invoke(d.controllerProvider,null,f)}else c.$$controller=d.controller;c.$$state=a,c.$$controllerAs=d.controllerAs,i[e]=c}))}),e.all(c).then(function(){return i.globals})}var n=d?c:k(a.params.$$keys(),c),o={$stateParams:n};i.resolve=l.resolve(a.resolve,o,i.resolve,a);var p=[i.resolve.then(function(a){i.globals=a})];return g&&p.push(g),e.all(p).then(m).then(function(a){return i})}var A=e.reject(new Error("transition superseded")),C=e.reject(new Error("transition prevented")),D=e.reject(new Error("transition aborted")),E=e.reject(new Error("transition failed"));return x.locals={resolve:null,globals:{$stateParams:{}}},y={params:{},current:x.self,$current:x,transition:null},y.reload=function(a){return y.transitionTo(y.current,n,{reload:a||!0,inherit:!1,notify:!0})},y.go=function(a,b,c){return y.transitionTo(a,b,R({inherit:!0,relative:y.$current},c))},y.transitionTo=function(b,c,f){c=c||{},f=R({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=y.$current,l=y.params,o=j.path,q=m(b,f.relative),r=c["#"];if(!L(q)){var s={to:b,toParams:c,options:f},t=u(s,j.self,l,f);if(t)return t;if(b=s.to,c=s.toParams,f=s.options,q=m(b,f.relative),!L(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[B])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(n,c||{},y.$current,q)),!q.params.$$validates(c))return E;c=q.params.$$values(c),b=q;var z=b.path,D=0,F=z[D],G=x.locals,H=[];if(f.reload){if(N(f.reload)||O(f.reload)){if(O(f.reload)&&!f.reload.name)throw new Error("Invalid reload state object");var I=f.reload===!0?o[0]:m(f.reload);if(f.reload&&!I)throw new Error("No such reload state '"+(N(f.reload)?f.reload:f.reload.name)+"'");for(;F&&F===o[D]&&F!==I;)G=H[D]=F.locals,D++,F=z[D]}}else for(;F&&F===o[D]&&F.ownParams.$$equals(c,l);)G=H[D]=F.locals,D++,F=z[D];if(w(b,c,j,l,G,f))return r&&(c["#"]=r),y.params=c,S(y.params,n),S(k(b.params.$$keys(),n),b.locals.globals.$stateParams),f.location&&b.navigable&&b.navigable.url&&(p.push(b.navigable.url,c,{$$avoidResync:!0,replace:"replace"===f.location}),p.update(!0)),y.transition=null,e.when(y.current);if(c=k(b.params.$$keys(),c||{}),r&&(c["#"]=r),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,l,f).defaultPrevented)return a.$broadcast("$stateChangeCancel",b.self,c,j.self,l),null==y.transition&&p.update(),C;for(var J=e.when(G),K=D;K<z.length;K++,F=z[K])G=H[K]=d(G),J=v(F,c,F===b,J,G,f);var M=y.transition=J.then(function(){var d,e,g;if(y.transition!==M)return A;for(d=o.length-1;d>=D;d--)g=o[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<z.length;d++)e=z[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return y.transition!==M?A:(y.$current=b,y.current=b.self,y.params=c,S(y.params,n),y.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,l),p.update(!0),y.current)},function(d){return y.transition!==M?A:(y.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,l,d),g.defaultPrevented||p.update(),e.reject(d))});return M},y.is=function(a,b,d){d=R({relative:y.$current},d||{});var e=m(a,d.relative);return L(e)?y.$current!==e?!1:b?j(e.params.$$values(b),n):!0:c},y.includes=function(a,b,d){if(d=R({relative:y.$current},d||{}),N(a)&&r(a)){if(!s(a))return!1;a=y.$current.name}var e=m(a,d.relative);return L(e)?L(y.$current.includes[e.name])?b?j(e.params.$$values(b),n,g(b)):!0:!1:c},y.href=function(a,b,d){d=R({lossy:!0,inherit:!0,absolute:!1,relative:y.$current},d||{});var e=m(a,d.relative);if(!L(e))return null;d.inherit&&(b=i(n,b||{},y.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys().concat("#"),b||{}),{absolute:d.absolute}):null},y.get=function(a,b){if(0===arguments.length)return o(g(z),function(a){return z[a].self});var c=m(a,b||y.$current);return c&&c.self?c.self:null},y}function w(a,b,c,d,e,f){function g(a,b,c){function d(b){return"search"!=a.params[b].location}var e=a.params.$$keys().filter(d),f=l.apply({},[a.params].concat(e)),g=new U.ParamSet(f);return g.$$equals(b,c)}return!f.reload&&a===c&&(e===c.locals||a.self.reloadOnSearch===!1&&g(c,d,b))?!0:void 0}var x,y,z={},A={},B="abstract",C={parent:function(a){if(L(a.parent)&&a.parent)return m(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?m(b[1]):x},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=d(a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(N(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||x).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new U.ParamSet;return Q(a.params||{},function(a,c){b[c]||(b[c]=new U.Param(c,null,a,"config"))}),b},params:function(a){var b=l(a.ownParams,a.ownParams.$$keys());return a.parent&&a.parent.params?R(a.parent.params.$$new(),b):new U.ParamSet},views:function(a){var b={};return Q(L(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?R({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};x=q({name:"",url:"^",views:null,"abstract":!0}),x.navigable=null,this.decorator=t,this.state=u,this.$get=v,v.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function w(){function a(a,b){return{load:function(a,c){var d,e={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return c=R(e,c),c.view&&(d=b.fromConfig(c.view,c.params,c.locals)),d}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function x(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){return c(function(){a[0].scrollIntoView()},0,!1)}}]}function y(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,c){function d(a){return 1===V&&W>=4?!!j.enabled(a):1===V&&W>=2?!!j.enabled():!!i}var e={enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}};if(a.noanimation)return e;if(j)return{enter:function(a,c,f){d(a)?b.version.minor>2?j.enter(a,null,c).then(f):j.enter(a,null,c,f):e.enter(a,c,f)},leave:function(a,c){d(a)?b.version.minor>2?j.leave(a).then(c):j.leave(a,c):e.leave(a,c)}};if(i){var f=i&&i(c,a);return{enter:function(a,b,c){f.enter(a,null,b),c()},leave:function(a,b){f.leave(a),b()}}}return e}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){function a(){b&&b.remove(),c&&c.$destroy()}var b=l,c=n;c&&(c._willBeDestroyed=!0),m?(r.leave(m,function(){a(),l=null}),l=m):(a(),l=null),m=null,n=null}function k(g){var k,l=A(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if((g||s!==o)&&!c._willBeDestroyed){k=c.$new(),o=a.$current.locals[l],k.$emit("$viewContentLoading",l);var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded",l),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),k(!0)}}};return k}function z(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=A(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e,k.$element=g;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function A(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function B(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function C(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function D(a){var b="[object SVGAnimatedString]"===Object.prototype.toString.call(a.prop("href")),c="FORM"===a[0].nodeName;return{attr:c?"action":b?"xlink:href":"href",isAnchor:"A"===a.prop("tagName").toUpperCase(),clickable:!c}}function E(a,b,c,d,e){return function(f){var g=f.which||f.button,h=e();if(!(g>1||f.ctrlKey||f.metaKey||f.shiftKey||a.attr("target"))){var i=c(function(){b.go(h.state,h.params,h.options)});f.preventDefault();var j=d.isAnchor&&!h.href?1:0;f.preventDefault=function(){j--<=0&&c.cancel(i)}}}}function F(a,b){return{relative:C(a)||b.$current,inherit:!0}}function G(a,c){return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(d,e,f,g){var h=B(f.uiSref,a.current.name),i={state:h.state,href:null,params:null},j=D(e),k=g[1]||g[0];i.options=R(F(e,a),f.uiSrefOpts?d.$eval(f.uiSrefOpts):{});var l=function(c){c&&(i.params=b.copy(c)),i.href=a.href(h.state,i.params,i.options),k&&k.$$addStateInfo(h.state,i.params),null!==i.href&&f.$set(j.attr,i.href)};h.paramExpr&&(d.$watch(h.paramExpr,function(a){a!==i.params&&l(a)},!0),i.params=b.copy(d.$eval(h.paramExpr))),l(),j.clickable&&e.bind("click",E(e,a,c,j,function(){return i}))}}}function H(a,b){return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(c,d,e,f){function g(b){l.state=b[0],l.params=b[1],l.options=b[2],l.href=a.href(l.state,l.params,l.options),i&&i.$$addStateInfo(l.state,l.params),l.href&&e.$set(h.attr,l.href)}var h=D(d),i=f[1]||f[0],j=[e.uiState,e.uiStateParams||null,e.uiStateOpts||null],k="["+j.map(function(a){return a||"null"}).join(", ")+"]",l={state:null,params:null,options:null,href:null};c.$watch(k,g,!0),g(c.$eval(k)),h.clickable&&d.bind("click",E(d,a,b,h,function(){return l}))}}}function I(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs","$timeout",function(b,d,e,f){function g(b,c,e){var f=a.get(b,C(d)),g=h(b,c);p.push({state:f||{name:b},params:c,hash:g}),q[g]=e}function h(a,c){if(!N(a))throw new Error("state should be a string");return O(c)?a+T(c):(c=b.$eval(c),O(c)?a+T(c):a)}function i(){for(var a=0;a<p.length;a++)l(p[a].state,p[a].params)?j(d,q[p[a].hash]):k(d,q[p[a].hash]),m(p[a].state,p[a].params)?j(d,n):k(d,n)}function j(a,b){f(function(){a.addClass(b)})}function k(a,b){a.removeClass(b)}function l(b,c){return a.includes(b.name,c)}function m(b,c){return a.is(b.name,c)}var n,o,p=[],q={};n=c(e.uiSrefActiveEq||"",!1)(b);try{o=b.$eval(e.uiSrefActive)}catch(r){}o=o||c(e.uiSrefActive||"",!1)(b),O(o)&&Q(o,function(c,d){if(N(c)){var e=B(c,a.current.name);g(e.state,b.$eval(e.paramExpr),d)}}),this.$$addStateInfo=function(a,b){O(o)&&p.length>0||(g(a,b,o),i())},b.$on("$stateChangeSuccess",i),i()}]}}function J(a){var b=function(b,c){return a.is(b,c)};return b.$stateful=!0,b}function K(a){var b=function(b,c,d){return a.includes(b,c,d)};return b.$stateful=!0,b}var L=b.isDefined,M=b.isFunction,N=b.isString,O=b.isObject,P=b.isArray,Q=b.forEach,R=b.extend,S=b.copy,T=b.toJson;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),p.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",p),q.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",q);var U;r.prototype.concat=function(a,b){var c={caseInsensitive:U.caseInsensitive(),strict:U.strictMode(),squash:U.defaultSquashPolicy()};return new r(this.sourcePath+a+this.sourceSearch,R(c,b),this)},r.prototype.toString=function(){return this.source},r.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/g,"-")}var d=b(a).split(/-(?!\\)/),e=o(d,b);return o(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");var l,m;for(e=0;j>e;e++){for(g=h[e],l=this.params[g],m=d[e+1],f=0;f<l.replace.length;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),L(m)&&(m=l.type.decode(m)),k[g]=l.value(m)}for(;i>e;e++){for(g=h[e],k[g]=this.params[g].value(b[g]),l=this.params[g],m=b[g],f=0;f<l.replace.length;f++)l.replace[f].from===m&&(m=l.replace[f].to);L(m)&&(m=l.type.decode(m)),k[g]=l.value(m)}return k},r.prototype.parameters=function(a){return L(a)?this.params[a]||null:this.$$paramNames},r.prototype.validates=function(a){return this.params.$$validates(a)},r.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],n=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),n),q=p?m.squash:!1,r=m.type.encode(n);if(k){var s=c[f+1],t=f+1===h;if(q===!1)null!=r&&(j+=P(r)?o(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var u=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(u)[1]}else N(q)&&(j+=q+s);t&&m.squash===!0&&"/"===j.slice(-1)&&(j=j.slice(0,-1))}else{if(null==r||p&&q!==!1)continue;if(P(r)||(r=[r]),0===r.length)continue;r=o(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},s.prototype.is=function(a,b){return!0},s.prototype.encode=function(a,b){return a},s.prototype.decode=function(a,b){return a},s.prototype.equals=function(a,b){return a==b},s.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},s.prototype.pattern=/.*/,s.prototype.toString=function(){return"{Type:"+this.name+"}"},s.prototype.$normalize=function(a){return this.is(a)?a:this.decode(a)},s.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return P(a)?a:L(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){if(P(c)&&0===c.length)return c;c=e(c);var d=o(c,a);return b===!0?0===n(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$normalize=h(d(a,"$normalize")),this.name=a.name,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",t),b.module("ui.router.util").run(["$urlMatcherFactory",function(a){}]),u.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",u),v.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").factory("$stateParams",function(){return{}}).provider("$state",v),w.$inject=[],b.module("ui.router.state").provider("$view",w),b.module("ui.router.state").provider("$uiViewScroll",x);var V=b.version.major,W=b.version.minor;y.$inject=["$state","$injector","$uiViewScroll","$interpolate"],z.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",y),b.module("ui.router.state").directive("uiView",z),G.$inject=["$state","$timeout"],H.$inject=["$state","$timeout"],I.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",G).directive("uiSrefActive",I).directive("uiSrefActiveEq",I).directive("uiState",H),
J.$inject=["$state"],K.$inject=["$state"],b.module("ui.router.state").filter("isState",J).filter("includedByState",K)}(window,window.angular);;
//  angularModalService.js
//
//  Service for showing modal dialogs.

/***** JSLint Config *****/
/*global angular  */
(function() {

  'use strict';

  var module = angular.module('angularModalService', []);

  module.factory('ModalService', ['$animate', '$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateRequest', '$timeout',
    function($animate, $document, $compile, $controller, $http, $rootScope, $q, $templateRequest, $timeout) {

    //  Get the body of the document, we'll add the modal to this.
    var body = angular.element($document[0].body);

    function ModalService() {

      var self = this;

      //  Returns a promise which gets the template, either
      //  from the template parameter or via a request to the
      //  template url parameter.
      var getTemplate = function(template, templateUrl) {
        var deferred = $q.defer();
        if (template) {
          deferred.resolve(template);
        } else if (templateUrl) {
          $templateRequest(templateUrl, true)
            .then(function(template) {
              deferred.resolve(template);
            }, function(error) {
              deferred.reject(error);
            });
        } else {
          deferred.reject("No template or templateUrl has been specified.");
        }
        return deferred.promise;
      };

      //  Adds an element to the DOM as the last child of its container
      //  like append, but uses $animate to handle animations. Returns a
      //  promise that is resolved once all animation is complete.
      var appendChild = function(parent, child) {
        var children = parent.children();
        if (children.length > 0) {
          return $animate.enter(child, parent, children[children.length - 1]);
        }
        return $animate.enter(child, parent);
      };

      self.showModal = function(options) {

        //  Create a deferred we'll resolve when the modal is ready.
        var deferred = $q.defer();

        //  Validate the input parameters.
        var controllerName = options.controller;
        if (!controllerName) {
          deferred.reject("No controller has been specified.");
          return deferred.promise;
        }

        //  Get the actual html of the template.
        getTemplate(options.template, options.templateUrl)
          .then(function(template) {

            //  Create a new scope for the modal.
            var modalScope = (options.scope || $rootScope).$new();

            //  Create the inputs object to the controller - this will include
            //  the scope, as well as all inputs provided.
            //  We will also create a deferred that is resolved with a provided
            //  close function. The controller can then call 'close(result)'.
            //  The controller can also provide a delay for closing - this is
            //  helpful if there are closing animations which must finish first.
            var closeDeferred = $q.defer();
            var closedDeferred = $q.defer();
            var inputs = {
              $scope: modalScope,
              close: function(result, delay) {
                if (delay === undefined || delay === null) delay = 0;
                $timeout(function() {
                  //  Resolve the 'close' promise.
                  closeDeferred.resolve(result);

                  //  Let angular remove the element and wait for animations to finish.
                  $animate.leave(modalElement)
                    .then(function () {
                      //  Resolve the 'closed' promise.
                      closedDeferred.resolve(result);

                      //  We can now clean up the scope
                      modalScope.$destroy();

                      //  Unless we null out all of these objects we seem to suffer
                      //  from memory leaks, if anyone can explain why then I'd
                      //  be very interested to know.
                      inputs.close = null;
                      deferred = null;
                      closeDeferred = null;
                      modal = null;
                      inputs = null;
                      modalElement = null;
                      modalScope = null;
                    });
                }, delay);
              }
            };

            //  If we have provided any inputs, pass them to the controller.
            if (options.inputs) angular.extend(inputs, options.inputs);

            //  Compile then link the template element, building the actual element.
            //  Set the $element on the inputs so that it can be injected if required.
            var linkFn = $compile(template);
            var modalElement = linkFn(modalScope);
            inputs.$element = modalElement;

            //  Create the controller, explicitly specifying the scope to use.
            var controllerObjBefore = modalScope[options.controllerAs];
            var modalController = $controller(options.controller, inputs, false, options.controllerAs);

            if (options.controllerAs && controllerObjBefore) {
              angular.extend(modalController, controllerObjBefore);
            }

            //  Finally, append the modal to the dom.
            if (options.appendElement) {
              // append to custom append element
              appendChild(options.appendElement, modalElement);
            } else {
              // append to body when no custom append element is specified
              appendChild(body, modalElement);
            }

            //  We now have a modal object...
            var modal = {
              controller: modalController,
              scope: modalScope,
              element: modalElement,
              close: closeDeferred.promise,
              closed: closedDeferred.promise
            };

            //  ...which is passed to the caller via the promise.
            deferred.resolve(modal);

          })
          .then(null, function(error) { // 'catch' doesn't work in IE8.
            deferred.reject(error);
          });

        return deferred.promise;
      };

    }

    return new ModalService();
  }]);

}());
;
/**
 * @license AngularJS v1.4.3
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

/* jshint ignore:start */
var noop        = angular.noop;
var extend      = angular.extend;
var jqLite      = angular.element;
var forEach     = angular.forEach;
var isArray     = angular.isArray;
var isString    = angular.isString;
var isObject    = angular.isObject;
var isUndefined = angular.isUndefined;
var isDefined   = angular.isDefined;
var isFunction  = angular.isFunction;
var isElement   = angular.isElement;

var ELEMENT_NODE = 1;
var COMMENT_NODE = 8;

var NG_ANIMATE_CLASSNAME = 'ng-animate';
var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';

var isPromiseLike = function(p) {
  return p && p.then ? true : false;
}

function assertArg(arg, name, reason) {
  if (!arg) {
    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));
  }
  return arg;
}

function mergeClasses(a,b) {
  if (!a && !b) return '';
  if (!a) return b;
  if (!b) return a;
  if (isArray(a)) a = a.join(' ');
  if (isArray(b)) b = b.join(' ');
  return a + ' ' + b;
}

function packageStyles(options) {
  var styles = {};
  if (options && (options.to || options.from)) {
    styles.to = options.to;
    styles.from = options.from;
  }
  return styles;
}

function pendClasses(classes, fix, isPrefix) {
  var className = '';
  classes = isArray(classes)
      ? classes
      : classes && isString(classes) && classes.length
          ? classes.split(/\s+/)
          : [];
  forEach(classes, function(klass, i) {
    if (klass && klass.length > 0) {
      className += (i > 0) ? ' ' : '';
      className += isPrefix ? fix + klass
                            : klass + fix;
    }
  });
  return className;
}

function removeFromArray(arr, val) {
  var index = arr.indexOf(val);
  if (val >= 0) {
    arr.splice(index, 1);
  }
}

function stripCommentsFromElement(element) {
  if (element instanceof jqLite) {
    switch (element.length) {
      case 0:
        return [];
        break;

      case 1:
        // there is no point of stripping anything if the element
        // is the only element within the jqLite wrapper.
        // (it's important that we retain the element instance.)
        if (element[0].nodeType === ELEMENT_NODE) {
          return element;
        }
        break;

      default:
        return jqLite(extractElementNode(element));
        break;
    }
  }

  if (element.nodeType === ELEMENT_NODE) {
    return jqLite(element);
  }
}

function extractElementNode(element) {
  if (!element[0]) return element;
  for (var i = 0; i < element.length; i++) {
    var elm = element[i];
    if (elm.nodeType == ELEMENT_NODE) {
      return elm;
    }
  }
}

function $$addClass($$jqLite, element, className) {
  forEach(element, function(elm) {
    $$jqLite.addClass(elm, className);
  });
}

function $$removeClass($$jqLite, element, className) {
  forEach(element, function(elm) {
    $$jqLite.removeClass(elm, className);
  });
}

function applyAnimationClassesFactory($$jqLite) {
  return function(element, options) {
    if (options.addClass) {
      $$addClass($$jqLite, element, options.addClass);
      options.addClass = null;
    }
    if (options.removeClass) {
      $$removeClass($$jqLite, element, options.removeClass);
      options.removeClass = null;
    }
  }
}

function prepareAnimationOptions(options) {
  options = options || {};
  if (!options.$$prepared) {
    var domOperation = options.domOperation || noop;
    options.domOperation = function() {
      options.$$domOperationFired = true;
      domOperation();
      domOperation = noop;
    };
    options.$$prepared = true;
  }
  return options;
}

function applyAnimationStyles(element, options) {
  applyAnimationFromStyles(element, options);
  applyAnimationToStyles(element, options);
}

function applyAnimationFromStyles(element, options) {
  if (options.from) {
    element.css(options.from);
    options.from = null;
  }
}

function applyAnimationToStyles(element, options) {
  if (options.to) {
    element.css(options.to);
    options.to = null;
  }
}

function mergeAnimationOptions(element, target, newOptions) {
  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');
  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');
  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);

  extend(target, newOptions);

  if (classes.addClass) {
    target.addClass = classes.addClass;
  } else {
    target.addClass = null;
  }

  if (classes.removeClass) {
    target.removeClass = classes.removeClass;
  } else {
    target.removeClass = null;
  }

  return target;
}

function resolveElementClasses(existing, toAdd, toRemove) {
  var ADD_CLASS = 1;
  var REMOVE_CLASS = -1;

  var flags = {};
  existing = splitClassesToLookup(existing);

  toAdd = splitClassesToLookup(toAdd);
  forEach(toAdd, function(value, key) {
    flags[key] = ADD_CLASS;
  });

  toRemove = splitClassesToLookup(toRemove);
  forEach(toRemove, function(value, key) {
    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
  });

  var classes = {
    addClass: '',
    removeClass: ''
  };

  forEach(flags, function(val, klass) {
    var prop, allow;
    if (val === ADD_CLASS) {
      prop = 'addClass';
      allow = !existing[klass];
    } else if (val === REMOVE_CLASS) {
      prop = 'removeClass';
      allow = existing[klass];
    }
    if (allow) {
      if (classes[prop].length) {
        classes[prop] += ' ';
      }
      classes[prop] += klass;
    }
  });

  function splitClassesToLookup(classes) {
    if (isString(classes)) {
      classes = classes.split(' ');
    }

    var obj = {};
    forEach(classes, function(klass) {
      // sometimes the split leaves empty string values
      // incase extra spaces were applied to the options
      if (klass.length) {
        obj[klass] = true;
      }
    });
    return obj;
  }

  return classes;
}

function getDomNode(element) {
  return (element instanceof angular.element) ? element[0] : element;
}

var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {
  var tickQueue = [];
  var cancelFn;

  function scheduler(tasks) {
    // we make a copy since RAFScheduler mutates the state
    // of the passed in array variable and this would be difficult
    // to track down on the outside code
    tickQueue.push([].concat(tasks));
    nextTick();
  }

  /* waitUntilQuiet does two things:
   * 1. It will run the FINAL `fn` value only when an uncancelled RAF has passed through
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.
   *
   * The motivation here is that animation code can request more time from the scheduler
   * before the next wave runs. This allows for certain DOM properties such as classes to
   * be resolved in time for the next animation to run.
   */
  scheduler.waitUntilQuiet = function(fn) {
    if (cancelFn) cancelFn();

    cancelFn = $$rAF(function() {
      cancelFn = null;
      fn();
      nextTick();
    });
  };

  return scheduler;

  function nextTick() {
    if (!tickQueue.length) return;

    var updatedQueue = [];
    for (var i = 0; i < tickQueue.length; i++) {
      var innerQueue = tickQueue[i];
      runNextTask(innerQueue);
      if (innerQueue.length) {
        updatedQueue.push(innerQueue);
      }
    }
    tickQueue = updatedQueue;

    if (!cancelFn) {
      $$rAF(function() {
        if (!cancelFn) nextTick();
      });
    }
  }

  function runNextTask(tasks) {
    var nextTask = tasks.shift();
    nextTask();
  }
}];

var $$AnimateChildrenDirective = [function() {
  return function(scope, element, attrs) {
    var val = attrs.ngAnimateChildren;
    if (angular.isString(val) && val.length === 0) { //empty attribute
      element.data(NG_ANIMATE_CHILDREN_DATA, true);
    } else {
      attrs.$observe('ngAnimateChildren', function(value) {
        value = value === 'on' || value === 'true';
        element.data(NG_ANIMATE_CHILDREN_DATA, value);
      });
    }
  };
}];

/**
 * @ngdoc service
 * @name $animateCss
 * @kind object
 *
 * @description
 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes
 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT
 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or
 * directives to create more complex animations that can be purely driven using CSS code.
 *
 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of
 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).
 *
 * ## Usage
 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that
 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,
 * any automatic control over cancelling animations and/or preventing animations from being run on
 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to
 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger
 * the CSS animation.
 *
 * The example below shows how we can create a folding animation on an element using `ng-if`:
 *
 * ```html
 * <!-- notice the `fold-animation` CSS class -->
 * <div ng-if="onOff" class="fold-animation">
 *   This element will go BOOM
 * </div>
 * <button ng-click="onOff=true">Fold In</button>
 * ```
 *
 * Now we create the **JavaScript animation** that will trigger the CSS transition:
 *
 * ```js
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var height = element[0].offsetHeight;
 *       return $animateCss(element, {
 *         from: { height:'0px' },
 *         to: { height:height + 'px' },
 *         duration: 1 // one second
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * ## More Advanced Uses
 *
 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
 *
 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
 * to provide a working animation that will run in CSS.
 *
 * The example below showcases a more advanced version of the `.fold-animation` from the example above:
 *
 * ```js
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var height = element[0].offsetHeight;
 *       return $animateCss(element, {
 *         addClass: 'red large-text pulse-twice',
 *         easing: 'ease-out',
 *         from: { height:'0px' },
 *         to: { height:height + 'px' },
 *         duration: 1 // one second
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:
 *
 * ```css
 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,
 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/
 * .red { background:red; }
 * .large-text { font-size:20px; }
 *
 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/
 * .pulse-twice {
 *   animation: 0.5s pulse linear 2;
 *   -webkit-animation: 0.5s pulse linear 2;
 * }
 *
 * @keyframes pulse {
 *   from { transform: scale(0.5); }
 *   to { transform: scale(1.5); }
 * }
 *
 * @-webkit-keyframes pulse {
 *   from { -webkit-transform: scale(0.5); }
 *   to { -webkit-transform: scale(1.5); }
 * }
 * ```
 *
 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
 *
 * ## How the Options are handled
 *
 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
 * styles using the `from` and `to` properties.
 *
 * ```js
 * var animator = $animateCss(element, {
 *   from: { background:'red' },
 *   to: { background:'blue' }
 * });
 * animator.start();
 * ```
 *
 * ```css
 * .rotating-animation {
 *   animation:0.5s rotate linear;
 *   -webkit-animation:0.5s rotate linear;
 * }
 *
 * @keyframes rotate {
 *   from { transform: rotate(0deg); }
 *   to { transform: rotate(360deg); }
 * }
 *
 * @-webkit-keyframes rotate {
 *   from { -webkit-transform: rotate(0deg); }
 *   to { -webkit-transform: rotate(360deg); }
 * }
 * ```
 *
 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
 * and spread across the transition and keyframe animation.
 *
 * ## What is returned
 *
 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
 *
 * ```js
 * var animator = $animateCss(element, { ... });
 * ```
 *
 * Now what do the contents of our `animator` variable look like:
 *
 * ```js
 * {
 *   // starts the animation
 *   start: Function,
 *
 *   // ends (aborts) the animation
 *   end: Function
 * }
 * ```
 *
 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and stlyes may have been
 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
 * and that changing them will not reconfigure the parameters of the animation.
 *
 * ### runner.done() vs runner.then()
 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
 * unless you really need a digest to kick off afterwards.
 *
 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).
 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.
 *
 * @param {DOMElement} element the element that will be animated
 * @param {object} options the animation-related options that will be applied during the animation
 *
 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).
 * * `transition` - The raw CSS transition style that will be used (e.g. `1s linear all`).
 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).
 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.
 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition.
 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
 * is provided then the animation will be skipped entirely.
 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
 * CSS delay value.
 * * `stagger` - A numeric time value representing the delay between successively animated elements
 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})
 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
 * `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)
 * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occuring on the classes being added and removed.)
 *
 * @return {object} an object with start and end methods and details about the animation.
 *
 * * `start` - The method to start the animation. This will return a `Promise` when called.
 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.
 */

// Detect proper transitionend/animationend event names.
var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;

// If unprefixed events are not supported but webkit-prefixed are, use the latter.
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.
// Register both events in case `window.onanimationend` is not supported because of that,
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit
// therefore there is no reason to test anymore for other vendor prefixes:
// http://caniuse.com/#search=transition
if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
  CSS_PREFIX = '-webkit-';
  TRANSITION_PROP = 'WebkitTransition';
  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
} else {
  TRANSITION_PROP = 'transition';
  TRANSITIONEND_EVENT = 'transitionend';
}

if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
  CSS_PREFIX = '-webkit-';
  ANIMATION_PROP = 'WebkitAnimation';
  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
} else {
  ANIMATION_PROP = 'animation';
  ANIMATIONEND_EVENT = 'animationend';
}

var DURATION_KEY = 'Duration';
var PROPERTY_KEY = 'Property';
var DELAY_KEY = 'Delay';
var TIMING_KEY = 'TimingFunction';
var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
var ANIMATION_PLAYSTATE_KEY = 'PlayState';
var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
var CLOSING_TIME_BUFFER = 1.5;
var ONE_SECOND = 1000;
var BASE_TEN = 10;

var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;

var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;
var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;

var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;
var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;

var DETECT_CSS_PROPERTIES = {
  transitionDuration:      TRANSITION_DURATION_PROP,
  transitionDelay:         TRANSITION_DELAY_PROP,
  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,
  animationDuration:       ANIMATION_DURATION_PROP,
  animationDelay:          ANIMATION_DELAY_PROP,
  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
};

var DETECT_STAGGER_CSS_PROPERTIES = {
  transitionDuration:      TRANSITION_DURATION_PROP,
  transitionDelay:         TRANSITION_DELAY_PROP,
  animationDuration:       ANIMATION_DURATION_PROP,
  animationDelay:          ANIMATION_DELAY_PROP
};

function computeCssStyles($window, element, properties) {
  var styles = Object.create(null);
  var detectedStyles = $window.getComputedStyle(element) || {};
  forEach(properties, function(formalStyleName, actualStyleName) {
    var val = detectedStyles[formalStyleName];
    if (val) {
      var c = val.charAt(0);

      // only numerical-based values have a negative sign or digit as the first value
      if (c === '-' || c === '+' || c >= 0) {
        val = parseMaxTime(val);
      }

      // by setting this to null in the event that the delay is not set or is set directly as 0
      // then we can still allow for zegative values to be used later on and not mistake this
      // value for being greater than any other negative value.
      if (val === 0) {
        val = null;
      }
      styles[actualStyleName] = val;
    }
  });

  return styles;
}

function parseMaxTime(str) {
  var maxValue = 0;
  var values = str.split(/\s*,\s*/);
  forEach(values, function(value) {
    // it's always safe to consider only second values and omit `ms` values since
    // getComputedStyle will always handle the conversion for us
    if (value.charAt(value.length - 1) == 's') {
      value = value.substring(0, value.length - 1);
    }
    value = parseFloat(value) || 0;
    maxValue = maxValue ? Math.max(value, maxValue) : value;
  });
  return maxValue;
}

function truthyTimingValue(val) {
  return val === 0 || val != null;
}

function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
  var style = TRANSITION_PROP;
  var value = duration + 's';
  if (applyOnlyDuration) {
    style += DURATION_KEY;
  } else {
    value += ' linear all';
  }
  return [style, value];
}

function getCssKeyframeDurationStyle(duration) {
  return [ANIMATION_DURATION_PROP, duration + 's'];
}

function getCssDelayStyle(delay, isKeyframeAnimation) {
  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
  return [prop, delay + 's'];
}

function blockTransitions(node, duration) {
  // we use a negative delay value since it performs blocking
  // yet it doesn't kill any existing transitions running on the
  // same element which makes this safe for class-based animations
  var value = duration ? '-' + duration + 's' : '';
  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);
  return [TRANSITION_DELAY_PROP, value];
}

function blockKeyframeAnimations(node, applyBlock) {
  var value = applyBlock ? 'paused' : '';
  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
  applyInlineStyle(node, [key, value]);
  return [key, value];
}

function applyInlineStyle(node, styleTuple) {
  var prop = styleTuple[0];
  var value = styleTuple[1];
  node.style[prop] = value;
}

function createLocalCacheLookup() {
  var cache = Object.create(null);
  return {
    flush: function() {
      cache = Object.create(null);
    },

    count: function(key) {
      var entry = cache[key];
      return entry ? entry.total : 0;
    },

    get: function(key) {
      var entry = cache[key];
      return entry && entry.value;
    },

    put: function(key, value) {
      if (!cache[key]) {
        cache[key] = { total: 1, value: value };
      } else {
        cache[key].total++;
      }
    }
  };
}

var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {
  var gcsLookup = createLocalCacheLookup();
  var gcsStaggerLookup = createLocalCacheLookup();

  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',
               '$document', '$sniffer', '$$rAFScheduler',
       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,
                $document,   $sniffer,   $$rAFScheduler) {

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    var parentCounter = 0;
    function gcsHashFn(node, extraClasses) {
      var KEY = "$$ngAnimateParentKey";
      var parentNode = node.parentNode;
      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;
    }

    function computeCachedCssStyles(node, className, cacheKey, properties) {
      var timings = gcsLookup.get(cacheKey);

      if (!timings) {
        timings = computeCssStyles($window, node, properties);
        if (timings.animationIterationCount === 'infinite') {
          timings.animationIterationCount = 1;
        }
      }

      // we keep putting this in multiple times even though the value and the cacheKey are the same
      // because we're keeping an interal tally of how many duplicate animations are detected.
      gcsLookup.put(cacheKey, timings);
      return timings;
    }

    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
      var stagger;

      // if we have one or more existing matches of matching elements
      // containing the same parent + CSS styles (which is how cacheKey works)
      // then staggering is possible
      if (gcsLookup.count(cacheKey) > 0) {
        stagger = gcsStaggerLookup.get(cacheKey);

        if (!stagger) {
          var staggerClassName = pendClasses(className, '-stagger');

          $$jqLite.addClass(node, staggerClassName);

          stagger = computeCssStyles($window, node, properties);

          // force the conversion of a null value to zero incase not set
          stagger.animationDuration = Math.max(stagger.animationDuration, 0);
          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);

          $$jqLite.removeClass(node, staggerClassName);

          gcsStaggerLookup.put(cacheKey, stagger);
        }
      }

      return stagger || {};
    }

    var bod = getDomNode($document).body;
    var rafWaitQueue = [];
    function waitUntilQuiet(callback) {
      rafWaitQueue.push(callback);
      $$rAFScheduler.waitUntilQuiet(function() {
        gcsLookup.flush();
        gcsStaggerLookup.flush();

        //the line below will force the browser to perform a repaint so
        //that all the animated elements within the animation frame will
        //be properly updated and drawn on screen. This is required to
        //ensure that the preparation animation is properly flushed so that
        //the active state picks up from there. DO NOT REMOVE THIS LINE.
        //DO NOT OPTIMIZE THIS LINE. THE MINIFIER WILL REMOVE IT OTHERWISE WHICH
        //WILL RESULT IN AN UNPREDICTABLE BUG THAT IS VERY HARD TO TRACK DOWN AND
        //WILL TAKE YEARS AWAY FROM YOUR LIFE.
        var width = bod.offsetWidth + 1;

        // we use a for loop to ensure that if the queue is changed
        // during this looping then it will consider new requests
        for (var i = 0; i < rafWaitQueue.length; i++) {
          rafWaitQueue[i](width);
        }
        rafWaitQueue.length = 0;
      });
    }

    return init;

    function computeTimings(node, className, cacheKey) {
      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);
      var aD = timings.animationDelay;
      var tD = timings.transitionDelay;
      timings.maxDelay = aD && tD
          ? Math.max(aD, tD)
          : (aD || tD);
      timings.maxDuration = Math.max(
          timings.animationDuration * timings.animationIterationCount,
          timings.transitionDuration);

      return timings;
    }

    function init(element, options) {
      var node = getDomNode(element);
      if (!node || !node.parentNode) {
        return closeAndReturnNoopAnimator();
      }

      options = prepareAnimationOptions(options);

      var temporaryStyles = [];
      var classes = element.attr('class');
      var styles = packageStyles(options);
      var animationClosed;
      var animationPaused;
      var animationCompleted;
      var runner;
      var runnerHost;
      var maxDelay;
      var maxDelayTime;
      var maxDuration;
      var maxDurationTime;

      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {
        return closeAndReturnNoopAnimator();
      }

      var method = options.event && isArray(options.event)
            ? options.event.join(' ')
            : options.event;

      var isStructural = method && options.structural;
      var structuralClassName = '';
      var addRemoveClassName = '';

      if (isStructural) {
        structuralClassName = pendClasses(method, 'ng-', true);
      } else if (method) {
        structuralClassName = method;
      }

      if (options.addClass) {
        addRemoveClassName += pendClasses(options.addClass, '-add');
      }

      if (options.removeClass) {
        if (addRemoveClassName.length) {
          addRemoveClassName += ' ';
        }
        addRemoveClassName += pendClasses(options.removeClass, '-remove');
      }

      // there may be a situation where a structural animation is combined together
      // with CSS classes that need to resolve before the animation is computed.
      // However this means that there is no explicit CSS code to block the animation
      // from happening (by setting 0s none in the class name). If this is the case
      // we need to apply the classes before the first rAF so we know to continue if
      // there actually is a detected transition or keyframe animation
      if (options.applyClassesEarly && addRemoveClassName.length) {
        applyAnimationClasses(element, options);
        addRemoveClassName = '';
      }

      var setupClasses = [structuralClassName, addRemoveClassName].join(' ').trim();
      var fullClassName = classes + ' ' + setupClasses;
      var activeClasses = pendClasses(setupClasses, '-active');
      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;
      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;

      // there is no way we can trigger an animation if no styles and
      // no classes are being applied which would then trigger a transition,
      // unless there a is raw keyframe value that is applied to the element.
      if (!containsKeyframeAnimation
           && !hasToStyles
           && !setupClasses) {
        return closeAndReturnNoopAnimator();
      }

      var cacheKey, stagger;
      if (options.stagger > 0) {
        var staggerVal = parseFloat(options.stagger);
        stagger = {
          transitionDelay: staggerVal,
          animationDelay: staggerVal,
          transitionDuration: 0,
          animationDuration: 0
        };
      } else {
        cacheKey = gcsHashFn(node, fullClassName);
        stagger = computeCachedCssStaggerStyles(node, setupClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
      }

      $$jqLite.addClass(element, setupClasses);

      var applyOnlyDuration;

      if (options.transitionStyle) {
        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];
        applyInlineStyle(node, transitionStyle);
        temporaryStyles.push(transitionStyle);
      }

      if (options.duration >= 0) {
        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);

        // we set the duration so that it will be picked up by getComputedStyle later
        applyInlineStyle(node, durationStyle);
        temporaryStyles.push(durationStyle);
      }

      if (options.keyframeStyle) {
        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];
        applyInlineStyle(node, keyframeStyle);
        temporaryStyles.push(keyframeStyle);
      }

      var itemIndex = stagger
          ? options.staggerIndex >= 0
              ? options.staggerIndex
              : gcsLookup.count(cacheKey)
          : 0;

      var isFirst = itemIndex === 0;

      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY
      // without causing any combination of transitions to kick in. By adding a negative delay value
      // it forces the setup class' transition to end immediately. We later then remove the negative
      // transition delay to allow for the transition to naturally do it's thing. The beauty here is
      // that if there is no transition defined then nothing will happen and this will also allow
      // other transitions to be stacked on top of each other without any chopping them out.
      if (isFirst) {
        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
      }

      var timings = computeTimings(node, fullClassName, cacheKey);
      var relativeDelay = timings.maxDelay;
      maxDelay = Math.max(relativeDelay, 0);
      maxDuration = timings.maxDuration;

      var flags = {};
      flags.hasTransitions          = timings.transitionDuration > 0;
      flags.hasAnimations           = timings.animationDuration > 0;
      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';
      flags.applyTransitionDuration = hasToStyles && (
                                        (flags.hasTransitions && !flags.hasTransitionAll)
                                         || (flags.hasAnimations && !flags.hasTransitions));
      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;
      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;
      flags.recalculateTimingStyles = addRemoveClassName.length > 0;

      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {
        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;

        if (flags.applyTransitionDuration) {
          flags.hasTransitions = true;
          timings.transitionDuration = maxDuration;
          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;
          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));
        }

        if (flags.applyAnimationDuration) {
          flags.hasAnimations = true;
          timings.animationDuration = maxDuration;
          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));
        }
      }

      if (maxDuration === 0 && !flags.recalculateTimingStyles) {
        return closeAndReturnNoopAnimator();
      }

      // we need to recalculate the delay value since we used a pre-emptive negative
      // delay value and the delay value is required for the final event checking. This
      // property will ensure that this will happen after the RAF phase has passed.
      if (options.duration == null && timings.transitionDuration > 0) {
        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;
      }

      maxDelayTime = maxDelay * ONE_SECOND;
      maxDurationTime = maxDuration * ONE_SECOND;
      if (!options.skipBlocking) {
        flags.blockTransition = timings.transitionDuration > 0;
        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&
                                       stagger.animationDelay > 0 &&
                                       stagger.animationDuration === 0;
      }

      applyAnimationFromStyles(element, options);
      if (!flags.blockTransition) {
        blockTransitions(node, false);
      }

      applyBlocking(maxDuration);

      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging
      return {
        $$willAnimate: true,
        end: endFn,
        start: function() {
          if (animationClosed) return;

          runnerHost = {
            end: endFn,
            cancel: cancelFn,
            resume: null, //this will be set during the start() phase
            pause: null
          };

          runner = new $$AnimateRunner(runnerHost);

          waitUntilQuiet(start);

          // we don't have access to pause/resume the animation
          // since it hasn't run yet. AnimateRunner will therefore
          // set noop functions for resume and pause and they will
          // later be overridden once the animation is triggered
          return runner;
        }
      };

      function endFn() {
        close();
      }

      function cancelFn() {
        close(true);
      }

      function close(rejected) { // jshint ignore:line
        // if the promise has been called already then we shouldn't close
        // the animation again
        if (animationClosed || (animationCompleted && animationPaused)) return;
        animationClosed = true;
        animationPaused = false;

        $$jqLite.removeClass(element, setupClasses);
        $$jqLite.removeClass(element, activeClasses);

        blockKeyframeAnimations(node, false);
        blockTransitions(node, false);

        forEach(temporaryStyles, function(entry) {
          // There is only one way to remove inline style properties entirely from elements.
          // By using `removeProperty` this works, but we need to convert camel-cased CSS
          // styles down to hyphenated values.
          node.style[entry[0]] = '';
        });

        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);

        // the reason why we have this option is to allow a synchronous closing callback
        // that is fired as SOON as the animation ends (when the CSS is removed) or if
        // the animation never takes off at all. A good example is a leave animation since
        // the element must be removed just after the animation is over or else the element
        // will appear on screen for one animation frame causing an overbearing flicker.
        if (options.onDone) {
          options.onDone();
        }

        // if the preparation function fails then the promise is not setup
        if (runner) {
          runner.complete(!rejected);
        }
      }

      function applyBlocking(duration) {
        if (flags.blockTransition) {
          blockTransitions(node, duration);
        }

        if (flags.blockKeyframeAnimation) {
          blockKeyframeAnimations(node, !!duration);
        }
      }

      function closeAndReturnNoopAnimator() {
        runner = new $$AnimateRunner({
          end: endFn,
          cancel: cancelFn
        });

        close();

        return {
          $$willAnimate: false,
          start: function() {
            return runner;
          },
          end: endFn
        };
      }

      function start() {
        if (animationClosed) return;
        if (!node.parentNode) {
          close();
          return;
        }

        var startTime, events = [];

        // even though we only pause keyframe animations here the pause flag
        // will still happen when transitions are used. Only the transition will
        // not be paused since that is not possible. If the animation ends when
        // paused then it will not complete until unpaused or cancelled.
        var playPause = function(playAnimation) {
          if (!animationCompleted) {
            animationPaused = !playAnimation;
            if (timings.animationDuration) {
              var value = blockKeyframeAnimations(node, animationPaused);
              animationPaused
                  ? temporaryStyles.push(value)
                  : removeFromArray(temporaryStyles, value);
            }
          } else if (animationPaused && playAnimation) {
            animationPaused = false;
            close();
          }
        };

        // checking the stagger duration prevents an accidently cascade of the CSS delay style
        // being inherited from the parent. If the transition duration is zero then we can safely
        // rely that the delay value is an intential stagger delay style.
        var maxStagger = itemIndex > 0
                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||
                            (timings.animationDuration && stagger.animationDuration === 0))
                         && Math.max(stagger.animationDelay, stagger.transitionDelay);
        if (maxStagger) {
          $timeout(triggerAnimationStart,
                   Math.floor(maxStagger * itemIndex * ONE_SECOND),
                   false);
        } else {
          triggerAnimationStart();
        }

        // this will decorate the existing promise runner with pause/resume methods
        runnerHost.resume = function() {
          playPause(true);
        };

        runnerHost.pause = function() {
          playPause(false);
        };

        function triggerAnimationStart() {
          // just incase a stagger animation kicks in when the animation
          // itself was cancelled entirely
          if (animationClosed) return;

          applyBlocking(false);

          forEach(temporaryStyles, function(entry) {
            var key = entry[0];
            var value = entry[1];
            node.style[key] = value;
          });

          applyAnimationClasses(element, options);
          $$jqLite.addClass(element, activeClasses);

          if (flags.recalculateTimingStyles) {
            fullClassName = node.className + ' ' + setupClasses;
            cacheKey = gcsHashFn(node, fullClassName);

            timings = computeTimings(node, fullClassName, cacheKey);
            relativeDelay = timings.maxDelay;
            maxDelay = Math.max(relativeDelay, 0);
            maxDuration = timings.maxDuration;

            if (maxDuration === 0) {
              close();
              return;
            }

            flags.hasTransitions = timings.transitionDuration > 0;
            flags.hasAnimations = timings.animationDuration > 0;
          }

          if (flags.applyTransitionDelay || flags.applyAnimationDelay) {
            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)
                  ? parseFloat(options.delay)
                  : relativeDelay;

            maxDelay = Math.max(relativeDelay, 0);

            var delayStyle;
            if (flags.applyTransitionDelay) {
              timings.transitionDelay = relativeDelay;
              delayStyle = getCssDelayStyle(relativeDelay);
              temporaryStyles.push(delayStyle);
              node.style[delayStyle[0]] = delayStyle[1];
            }

            if (flags.applyAnimationDelay) {
              timings.animationDelay = relativeDelay;
              delayStyle = getCssDelayStyle(relativeDelay, true);
              temporaryStyles.push(delayStyle);
              node.style[delayStyle[0]] = delayStyle[1];
            }
          }

          maxDelayTime = maxDelay * ONE_SECOND;
          maxDurationTime = maxDuration * ONE_SECOND;

          if (options.easing) {
            var easeProp, easeVal = options.easing;
            if (flags.hasTransitions) {
              easeProp = TRANSITION_PROP + TIMING_KEY;
              temporaryStyles.push([easeProp, easeVal]);
              node.style[easeProp] = easeVal;
            }
            if (flags.hasAnimations) {
              easeProp = ANIMATION_PROP + TIMING_KEY;
              temporaryStyles.push([easeProp, easeVal]);
              node.style[easeProp] = easeVal;
            }
          }

          if (timings.transitionDuration) {
            events.push(TRANSITIONEND_EVENT);
          }

          if (timings.animationDuration) {
            events.push(ANIMATIONEND_EVENT);
          }

          startTime = Date.now();
          element.on(events.join(' '), onAnimationProgress);
          $timeout(onAnimationExpired, maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime);

          applyAnimationToStyles(element, options);
        }

        function onAnimationExpired() {
          // although an expired animation is a failed animation, getting to
          // this outcome is very easy if the CSS code screws up. Therefore we
          // should still continue normally as if the animation completed correctly.
          close();
        }

        function onAnimationProgress(event) {
          event.stopPropagation();
          var ev = event.originalEvent || event;
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();

          /* Firefox (or possibly just Gecko) likes to not round values up
           * when a ms measurement is used for the animation */
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));

          /* $manualTimeStamp is a mocked timeStamp value which is set
           * within browserTrigger(). This is only here so that tests can
           * mock animations properly. Real events fallback to event.timeStamp,
           * or, if they don't, then a timeStamp is automatically created for them.
           * We're checking to see if the timeStamp surpasses the expected delay,
           * but we're using elapsedTime instead of the timeStamp on the 2nd
           * pre-condition since animations sometimes close off early */
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
            // we set this flag to ensure that if the transition is paused then, when resumed,
            // the animation will automatically close itself since transitions cannot be paused.
            animationCompleted = true;
            close();
          }
        }
      }
    }
  }];
}];

var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {
  $$animationProvider.drivers.push('$$animateCssDriver');

  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';
  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';

  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';
  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';

  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$document', '$sniffer',
       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $document,   $sniffer) {

    // only browsers that support these properties can render animations
    if (!$sniffer.animations && !$sniffer.transitions) return noop;

    var bodyNode = getDomNode($document).body;
    var rootNode = getDomNode($rootElement);

    var rootBodyElement = jqLite(bodyNode.parentNode === rootNode ? bodyNode : rootNode);

    return function initDriverFn(animationDetails) {
      return animationDetails.from && animationDetails.to
          ? prepareFromToAnchorAnimation(animationDetails.from,
                                         animationDetails.to,
                                         animationDetails.classes,
                                         animationDetails.anchors)
          : prepareRegularAnimation(animationDetails);
    };

    function filterCssClasses(classes) {
      //remove all the `ng-` stuff
      return classes.replace(/\bng-\S+\b/g, '');
    }

    function getUniqueValues(a, b) {
      if (isString(a)) a = a.split(' ');
      if (isString(b)) b = b.split(' ');
      return a.filter(function(val) {
        return b.indexOf(val) === -1;
      }).join(' ');
    }

    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));
      var startingClasses = filterCssClasses(getClassVal(clone));

      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);

      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);

      rootBodyElement.append(clone);

      var animatorIn, animatorOut = prepareOutAnimation();

      // the user may not end up using the `out` animation and
      // only making use of the `in` animation or vice-versa.
      // In either case we should allow this and not assume the
      // animation is over unless both animations are not used.
      if (!animatorOut) {
        animatorIn = prepareInAnimation();
        if (!animatorIn) {
          return end();
        }
      }

      var startingAnimator = animatorOut || animatorIn;

      return {
        start: function() {
          var runner;

          var currentAnimation = startingAnimator.start();
          currentAnimation.done(function() {
            currentAnimation = null;
            if (!animatorIn) {
              animatorIn = prepareInAnimation();
              if (animatorIn) {
                currentAnimation = animatorIn.start();
                currentAnimation.done(function() {
                  currentAnimation = null;
                  end();
                  runner.complete();
                });
                return currentAnimation;
              }
            }
            // in the event that there is no `in` animation
            end();
            runner.complete();
          });

          runner = new $$AnimateRunner({
            end: endFn,
            cancel: endFn
          });

          return runner;

          function endFn() {
            if (currentAnimation) {
              currentAnimation.end();
            }
          }
        }
      };

      function calculateAnchorStyles(anchor) {
        var styles = {};

        var coords = getDomNode(anchor).getBoundingClientRect();

        // we iterate directly since safari messes up and doesn't return
        // all the keys for the coods object when iterated
        forEach(['width','height','top','left'], function(key) {
          var value = coords[key];
          switch (key) {
            case 'top':
              value += bodyNode.scrollTop;
              break;
            case 'left':
              value += bodyNode.scrollLeft;
              break;
          }
          styles[key] = Math.floor(value) + 'px';
        });
        return styles;
      }

      function prepareOutAnimation() {
        var animator = $animateCss(clone, {
          addClass: NG_OUT_ANCHOR_CLASS_NAME,
          delay: true,
          from: calculateAnchorStyles(outAnchor)
        });

        // read the comment within `prepareRegularAnimation` to understand
        // why this check is necessary
        return animator.$$willAnimate ? animator : null;
      }

      function getClassVal(element) {
        return element.attr('class') || '';
      }

      function prepareInAnimation() {
        var endingClasses = filterCssClasses(getClassVal(inAnchor));
        var toAdd = getUniqueValues(endingClasses, startingClasses);
        var toRemove = getUniqueValues(startingClasses, endingClasses);

        var animator = $animateCss(clone, {
          to: calculateAnchorStyles(inAnchor),
          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,
          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,
          delay: true
        });

        // read the comment within `prepareRegularAnimation` to understand
        // why this check is necessary
        return animator.$$willAnimate ? animator : null;
      }

      function end() {
        clone.remove();
        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
      }
    }

    function prepareFromToAnchorAnimation(from, to, classes, anchors) {
      var fromAnimation = prepareRegularAnimation(from);
      var toAnimation = prepareRegularAnimation(to);

      var anchorAnimations = [];
      forEach(anchors, function(anchor) {
        var outElement = anchor['out'];
        var inElement = anchor['in'];
        var animator = prepareAnchoredAnimation(classes, outElement, inElement);
        if (animator) {
          anchorAnimations.push(animator);
        }
      });

      // no point in doing anything when there are no elements to animate
      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;

      return {
        start: function() {
          var animationRunners = [];

          if (fromAnimation) {
            animationRunners.push(fromAnimation.start());
          }

          if (toAnimation) {
            animationRunners.push(toAnimation.start());
          }

          forEach(anchorAnimations, function(animation) {
            animationRunners.push(animation.start());
          });

          var runner = new $$AnimateRunner({
            end: endFn,
            cancel: endFn // CSS-driven animations cannot be cancelled, only ended
          });

          $$AnimateRunner.all(animationRunners, function(status) {
            runner.complete(status);
          });

          return runner;

          function endFn() {
            forEach(animationRunners, function(runner) {
              runner.end();
            });
          }
        }
      };
    }

    function prepareRegularAnimation(animationDetails) {
      var element = animationDetails.element;
      var options = animationDetails.options || {};

      if (animationDetails.structural) {
        // structural animations ensure that the CSS classes are always applied
        // before the detection starts.
        options.structural = options.applyClassesEarly = true;

        // we special case the leave animation since we want to ensure that
        // the element is removed as soon as the animation is over. Otherwise
        // a flicker might appear or the element may not be removed at all
        options.event = animationDetails.event;
        if (options.event === 'leave') {
          options.onDone = options.domOperation;
        }
      } else {
        options.event = null;
      }

      var animator = $animateCss(element, options);

      // the driver lookup code inside of $$animation attempts to spawn a
      // driver one by one until a driver returns a.$$willAnimate animator object.
      // $animateCss will always return an object, however, it will pass in
      // a flag as a hint as to whether an animation was detected or not
      return animator.$$willAnimate ? animator : null;
    }
  }];
}];

// TODO(matsko): use caching here to speed things up for detection
// TODO(matsko): add documentation
//  by the time...

var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {
  this.$get = ['$injector', '$$AnimateRunner', '$$rAFMutex', '$$jqLite',
       function($injector,   $$AnimateRunner,   $$rAFMutex,   $$jqLite) {

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
         // $animateJs(element, 'enter');
    return function(element, event, classes, options) {
      // the `classes` argument is optional and if it is not used
      // then the classes will be resolved from the element's className
      // property as well as options.addClass/options.removeClass.
      if (arguments.length === 3 && isObject(classes)) {
        options = classes;
        classes = null;
      }

      options = prepareAnimationOptions(options);
      if (!classes) {
        classes = element.attr('class') || '';
        if (options.addClass) {
          classes += ' ' + options.addClass;
        }
        if (options.removeClass) {
          classes += ' ' + options.removeClass;
        }
      }

      var classesToAdd = options.addClass;
      var classesToRemove = options.removeClass;

      // the lookupAnimations function returns a series of animation objects that are
      // matched up with one or more of the CSS classes. These animation objects are
      // defined via the module.animation factory function. If nothing is detected then
      // we don't return anything which then makes $animation query the next driver.
      var animations = lookupAnimations(classes);
      var before, after;
      if (animations.length) {
        var afterFn, beforeFn;
        if (event == 'leave') {
          beforeFn = 'leave';
          afterFn = 'afterLeave'; // TODO(matsko): get rid of this
        } else {
          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);
          afterFn = event;
        }

        if (event !== 'enter' && event !== 'move') {
          before = packageAnimations(element, event, options, animations, beforeFn);
        }
        after  = packageAnimations(element, event, options, animations, afterFn);
      }

      // no matching animations
      if (!before && !after) return;

      function applyOptions() {
        options.domOperation();
        applyAnimationClasses(element, options);
      }

      return {
        start: function() {
          var closeActiveAnimations;
          var chain = [];

          if (before) {
            chain.push(function(fn) {
              closeActiveAnimations = before(fn);
            });
          }

          if (chain.length) {
            chain.push(function(fn) {
              applyOptions();
              fn(true);
            });
          } else {
            applyOptions();
          }

          if (after) {
            chain.push(function(fn) {
              closeActiveAnimations = after(fn);
            });
          }

          var animationClosed = false;
          var runner = new $$AnimateRunner({
            end: function() {
              endAnimations();
            },
            cancel: function() {
              endAnimations(true);
            }
          });

          $$AnimateRunner.chain(chain, onComplete);
          return runner;

          function onComplete(success) {
            animationClosed = true;
            applyOptions();
            applyAnimationStyles(element, options);
            runner.complete(success);
          }

          function endAnimations(cancelled) {
            if (!animationClosed) {
              (closeActiveAnimations || noop)(cancelled);
              onComplete(cancelled);
            }
          }
        }
      };

      function executeAnimationFn(fn, element, event, options, onDone) {
        var args;
        switch (event) {
          case 'animate':
            args = [element, options.from, options.to, onDone];
            break;

          case 'setClass':
            args = [element, classesToAdd, classesToRemove, onDone];
            break;

          case 'addClass':
            args = [element, classesToAdd, onDone];
            break;

          case 'removeClass':
            args = [element, classesToRemove, onDone];
            break;

          default:
            args = [element, onDone];
            break;
        }

        args.push(options);

        var value = fn.apply(fn, args);
        if (value) {
          if (isFunction(value.start)) {
            value = value.start();
          }

          if (value instanceof $$AnimateRunner) {
            value.done(onDone);
          } else if (isFunction(value)) {
            // optional onEnd / onCancel callback
            return value;
          }
        }

        return noop;
      }

      function groupEventedAnimations(element, event, options, animations, fnName) {
        var operations = [];
        forEach(animations, function(ani) {
          var animation = ani[fnName];
          if (!animation) return;

          // note that all of these animations will run in parallel
          operations.push(function() {
            var runner;
            var endProgressCb;

            var resolved = false;
            var onAnimationComplete = function(rejected) {
              if (!resolved) {
                resolved = true;
                (endProgressCb || noop)(rejected);
                runner.complete(!rejected);
              }
            };

            runner = new $$AnimateRunner({
              end: function() {
                onAnimationComplete();
              },
              cancel: function() {
                onAnimationComplete(true);
              }
            });

            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
              var cancelled = result === false;
              onAnimationComplete(cancelled);
            });

            return runner;
          });
        });

        return operations;
      }

      function packageAnimations(element, event, options, animations, fnName) {
        var operations = groupEventedAnimations(element, event, options, animations, fnName);
        if (operations.length === 0) {
          var a,b;
          if (fnName === 'beforeSetClass') {
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');
            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');
          } else if (fnName === 'setClass') {
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');
            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');
          }

          if (a) {
            operations = operations.concat(a);
          }
          if (b) {
            operations = operations.concat(b);
          }
        }

        if (operations.length === 0) return;

        // TODO(matsko): add documentation
        return function startAnimation(callback) {
          var runners = [];
          if (operations.length) {
            forEach(operations, function(animateFn) {
              runners.push(animateFn());
            });
          }

          runners.length ? $$AnimateRunner.all(runners, callback) : callback();

          return function endFn(reject) {
            forEach(runners, function(runner) {
              reject ? runner.cancel() : runner.end();
            });
          };
        };
      }
    };

    function lookupAnimations(classes) {
      classes = isArray(classes) ? classes : classes.split(' ');
      var matches = [], flagMap = {};
      for (var i=0; i < classes.length; i++) {
        var klass = classes[i],
            animationFactory = $animateProvider.$$registeredAnimations[klass];
        if (animationFactory && !flagMap[klass]) {
          matches.push($injector.get(animationFactory));
          flagMap[klass] = true;
        }
      }
      return matches;
    }
  }];
}];

var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {
  $$animationProvider.drivers.push('$$animateJsDriver');
  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {
    return function initDriverFn(animationDetails) {
      if (animationDetails.from && animationDetails.to) {
        var fromAnimation = prepareAnimation(animationDetails.from);
        var toAnimation = prepareAnimation(animationDetails.to);
        if (!fromAnimation && !toAnimation) return;

        return {
          start: function() {
            var animationRunners = [];

            if (fromAnimation) {
              animationRunners.push(fromAnimation.start());
            }

            if (toAnimation) {
              animationRunners.push(toAnimation.start());
            }

            $$AnimateRunner.all(animationRunners, done);

            var runner = new $$AnimateRunner({
              end: endFnFactory(),
              cancel: endFnFactory()
            });

            return runner;

            function endFnFactory() {
              return function() {
                forEach(animationRunners, function(runner) {
                  // at this point we cannot cancel animations for groups just yet. 1.5+
                  runner.end();
                });
              };
            }

            function done(status) {
              runner.complete(status);
            }
          }
        };
      } else {
        return prepareAnimation(animationDetails);
      }
    };

    function prepareAnimation(animationDetails) {
      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations
      var element = animationDetails.element;
      var event = animationDetails.event;
      var options = animationDetails.options;
      var classes = animationDetails.classes;
      return $$animateJs(element, event, classes, options);
    }
  }];
}];

var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';
var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';
var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {
  var PRE_DIGEST_STATE = 1;
  var RUNNING_STATE = 2;

  var rules = this.rules = {
    skip: [],
    cancel: [],
    join: []
  };

  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
    return rules[ruleType].some(function(fn) {
      return fn(element, currentAnimation, previousAnimation);
    });
  }

  function hasAnimationClasses(options, and) {
    options = options || {};
    var a = (options.addClass || '').length > 0;
    var b = (options.removeClass || '').length > 0;
    return and ? a && b : a || b;
  }

  rules.join.push(function(element, newAnimation, currentAnimation) {
    // if the new animation is class-based then we can just tack that on
    return !newAnimation.structural && hasAnimationClasses(newAnimation.options);
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // there is no need to animate anything if no classes are being added and
    // there is no structural animation that will be triggered
    return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // why should we trigger a new structural animation if the element will
    // be removed from the DOM anyway?
    return currentAnimation.event == 'leave' && newAnimation.structural;
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // if there is a current animation then skip the class-based animation
    return currentAnimation.structural && !newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    // there can never be two structural animations running at the same time
    return currentAnimation.structural && newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    // if the previous animation is already running, but the new animation will
    // be triggered, but the new animation is structural
    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    var nO = newAnimation.options;
    var cO = currentAnimation.options;

    // if the exact same CSS class is added/removed then it's safe to cancel it
    return (nO.addClass && nO.addClass === cO.removeClass) || (nO.removeClass && nO.removeClass === cO.addClass);
  });

  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$HashMap',
               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite',
       function($$rAF,   $rootScope,   $rootElement,   $document,   $$HashMap,
                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite) {

    var activeAnimationsLookup = new $$HashMap();
    var disabledElementsLookup = new $$HashMap();

    var animationsEnabled = null;

    // Wait until all directive and route-related templates are downloaded and
    // compiled. The $templateRequest.totalPendingRequests variable keeps track of
    // all of the remote templates being currently downloaded. If there are no
    // templates currently downloading then the watcher will still fire anyway.
    var deregisterWatch = $rootScope.$watch(
      function() { return $templateRequest.totalPendingRequests === 0; },
      function(isEmpty) {
        if (!isEmpty) return;
        deregisterWatch();

        // Now that all templates have been downloaded, $animate will wait until
        // the post digest queue is empty before enabling animations. By having two
        // calls to $postDigest calls we can ensure that the flag is enabled at the
        // very end of the post digest queue. Since all of the animations in $animate
        // use $postDigest, it's important that the code below executes at the end.
        // This basically means that the page is fully downloaded and compiled before
        // any animations are triggered.
        $rootScope.$$postDigest(function() {
          $rootScope.$$postDigest(function() {
            // we check for null directly in the event that the application already called
            // .enabled() with whatever arguments that it provided it with
            if (animationsEnabled === null) {
              animationsEnabled = true;
            }
          });
        });
      }
    );

    var bodyElement = jqLite($document[0].body);

    var callbackRegistry = {};

    // remember that the classNameFilter is set during the provider/config
    // stage therefore we can optimize here and setup a helper function
    var classNameFilter = $animateProvider.classNameFilter();
    var isAnimatableClassName = !classNameFilter
              ? function() { return true; }
              : function(className) {
                return classNameFilter.test(className);
              };

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    function normalizeAnimationOptions(element, options) {
      return mergeAnimationOptions(element, options, {});
    }

    function findCallbacks(element, event) {
      var targetNode = getDomNode(element);

      var matches = [];
      var entries = callbackRegistry[event];
      if (entries) {
        forEach(entries, function(entry) {
          if (entry.node.contains(targetNode)) {
            matches.push(entry.callback);
          }
        });
      }

      return matches;
    }

    function triggerCallback(event, element, phase, data) {
      $$rAF(function() {
        forEach(findCallbacks(element, event), function(callback) {
          callback(element, phase, data);
        });
      });
    }

    return {
      on: function(event, container, callback) {
        var node = extractElementNode(container);
        callbackRegistry[event] = callbackRegistry[event] || [];
        callbackRegistry[event].push({
          node: node,
          callback: callback
        });
      },

      off: function(event, container, callback) {
        var entries = callbackRegistry[event];
        if (!entries) return;

        callbackRegistry[event] = arguments.length === 1
            ? null
            : filterFromRegistry(entries, container, callback);

        function filterFromRegistry(list, matchContainer, matchCallback) {
          var containerNode = extractElementNode(matchContainer);
          return list.filter(function(entry) {
            var isMatch = entry.node === containerNode &&
                            (!matchCallback || entry.callback === matchCallback);
            return !isMatch;
          });
        }
      },

      pin: function(element, parentElement) {
        assertArg(isElement(element), 'element', 'not an element');
        assertArg(isElement(parentElement), 'parentElement', 'not an element');
        element.data(NG_ANIMATE_PIN_DATA, parentElement);
      },

      push: function(element, event, options, domOperation) {
        options = options || {};
        options.domOperation = domOperation;
        return queueAnimation(element, event, options);
      },

      // this method has four signatures:
      //  () - global getter
      //  (bool) - global setter
      //  (element) - element getter
      //  (element, bool) - element setter<F37>
      enabled: function(element, bool) {
        var argCount = arguments.length;

        if (argCount === 0) {
          // () - Global getter
          bool = !!animationsEnabled;
        } else {
          var hasElement = isElement(element);

          if (!hasElement) {
            // (bool) - Global setter
            bool = animationsEnabled = !!element;
          } else {
            var node = getDomNode(element);
            var recordExists = disabledElementsLookup.get(node);

            if (argCount === 1) {
              // (element) - Element getter
              bool = !recordExists;
            } else {
              // (element, bool) - Element setter
              bool = !!bool;
              if (!bool) {
                disabledElementsLookup.put(node, true);
              } else if (recordExists) {
                disabledElementsLookup.remove(node);
              }
            }
          }
        }

        return bool;
      }
    };

    function queueAnimation(element, event, options) {
      var node, parent;
      element = stripCommentsFromElement(element);
      if (element) {
        node = getDomNode(element);
        parent = element.parent();
      }

      options = prepareAnimationOptions(options);

      // we create a fake runner with a working promise.
      // These methods will become available after the digest has passed
      var runner = new $$AnimateRunner();

      // there are situations where a directive issues an animation for
      // a jqLite wrapper that contains only comment nodes... If this
      // happens then there is no way we can perform an animation
      if (!node) {
        close();
        return runner;
      }

      if (isArray(options.addClass)) {
        options.addClass = options.addClass.join(' ');
      }

      if (isArray(options.removeClass)) {
        options.removeClass = options.removeClass.join(' ');
      }

      if (options.from && !isObject(options.from)) {
        options.from = null;
      }

      if (options.to && !isObject(options.to)) {
        options.to = null;
      }

      var className = [node.className, options.addClass, options.removeClass].join(' ');
      if (!isAnimatableClassName(className)) {
        close();
        return runner;
      }

      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;

      // this is a hard disable of all animations for the application or on
      // the element itself, therefore  there is no need to continue further
      // past this point if not enabled
      var skipAnimations = !animationsEnabled || disabledElementsLookup.get(node);
      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};
      var hasExistingAnimation = !!existingAnimation.state;

      // there is no point in traversing the same collection of parent ancestors if a followup
      // animation will be run on the same element that already did all that checking work
      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {
        skipAnimations = !areAnimationsAllowed(element, parent, event);
      }

      if (skipAnimations) {
        close();
        return runner;
      }

      if (isStructural) {
        closeChildAnimations(element);
      }

      var newAnimation = {
        structural: isStructural,
        element: element,
        event: event,
        close: close,
        options: options,
        runner: runner
      };

      if (hasExistingAnimation) {
        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);
        if (skipAnimationFlag) {
          if (existingAnimation.state === RUNNING_STATE) {
            close();
            return runner;
          } else {
            mergeAnimationOptions(element, existingAnimation.options, options);
            return existingAnimation.runner;
          }
        }

        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);
        if (cancelAnimationFlag) {
          if (existingAnimation.state === RUNNING_STATE) {
            // this will end the animation right away and it is safe
            // to do so since the animation is already running and the
            // runner callback code will run in async
            existingAnimation.runner.end();
          } else if (existingAnimation.structural) {
            // this means that the animation is queued into a digest, but
            // hasn't started yet. Therefore it is safe to run the close
            // method which will call the runner methods in async.
            existingAnimation.close();
          } else {
            // this will merge the existing animation options into this new follow-up animation
            mergeAnimationOptions(element, newAnimation.options, existingAnimation.options);
          }
        } else {
          // a joined animation means that this animation will take over the existing one
          // so an example would involve a leave animation taking over an enter. Then when
          // the postDigest kicks in the enter will be ignored.
          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);
          if (joinAnimationFlag) {
            if (existingAnimation.state === RUNNING_STATE) {
              normalizeAnimationOptions(element, options);
            } else {
              event = newAnimation.event = existingAnimation.event;
              options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);
              return runner;
            }
          }
        }
      } else {
        // normalization in this case means that it removes redundant CSS classes that
        // already exist (addClass) or do not exist (removeClass) on the element
        normalizeAnimationOptions(element, options);
      }

      // when the options are merged and cleaned up we may end up not having to do
      // an animation at all, therefore we should check this before issuing a post
      // digest callback. Structural animations will always run no matter what.
      var isValidAnimation = newAnimation.structural;
      if (!isValidAnimation) {
        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present
        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0)
                            || hasAnimationClasses(newAnimation.options);
      }

      if (!isValidAnimation) {
        close();
        clearElementAnimationState(element);
        return runner;
      }

      if (isStructural) {
        closeParentClassBasedAnimations(parent);
      }

      // the counter keeps track of cancelled animations
      var counter = (existingAnimation.counter || 0) + 1;
      newAnimation.counter = counter;

      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);

      $rootScope.$$postDigest(function() {
        var animationDetails = activeAnimationsLookup.get(node);
        var animationCancelled = !animationDetails;
        animationDetails = animationDetails || {};

        // if addClass/removeClass is called before something like enter then the
        // registered parent element may not be present. The code below will ensure
        // that a final value for parent element is obtained
        var parentElement = element.parent() || [];

        // animate/structural/class-based animations all have requirements. Otherwise there
        // is no point in performing an animation. The parent node must also be set.
        var isValidAnimation = parentElement.length > 0
                                && (animationDetails.event === 'animate'
                                    || animationDetails.structural
                                    || hasAnimationClasses(animationDetails.options));

        // this means that the previous animation was cancelled
        // even if the follow-up animation is the same event
        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {
          // if another animation did not take over then we need
          // to make sure that the domOperation and options are
          // handled accordingly
          if (animationCancelled) {
            applyAnimationClasses(element, options);
            applyAnimationStyles(element, options);
          }

          // if the event changed from something like enter to leave then we do
          // it, otherwise if it's the same then the end result will be the same too
          if (animationCancelled || (isStructural && animationDetails.event !== event)) {
            options.domOperation();
            runner.end();
          }

          // in the event that the element animation was not cancelled or a follow-up animation
          // isn't allowed to animate from here then we need to clear the state of the element
          // so that any future animations won't read the expired animation data.
          if (!isValidAnimation) {
            clearElementAnimationState(element);
          }

          return;
        }

        // this combined multiple class to addClass / removeClass into a setClass event
        // so long as a structural event did not take over the animation
        event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, true)
            ? 'setClass'
            : animationDetails.event;

        if (animationDetails.structural) {
          closeParentClassBasedAnimations(parentElement);
        }

        markElementAnimationState(element, RUNNING_STATE);
        var realRunner = $$animation(element, event, animationDetails.options);
        realRunner.done(function(status) {
          close(!status);
          var animationDetails = activeAnimationsLookup.get(node);
          if (animationDetails && animationDetails.counter === counter) {
            clearElementAnimationState(getDomNode(element));
          }
          notifyProgress(runner, event, 'close', {});
        });

        // this will update the runner's flow-control events based on
        // the `realRunner` object.
        runner.setHost(realRunner);
        notifyProgress(runner, event, 'start', {});
      });

      return runner;

      function notifyProgress(runner, event, phase, data) {
        triggerCallback(event, element, phase, data);
        runner.progress(event, phase, data);
      }

      function close(reject) { // jshint ignore:line
        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);
        options.domOperation();
        runner.complete(!reject);
      }
    }

    function closeChildAnimations(element) {
      var node = getDomNode(element);
      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');
      forEach(children, function(child) {
        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));
        var animationDetails = activeAnimationsLookup.get(child);
        switch (state) {
          case RUNNING_STATE:
            animationDetails.runner.end();
            /* falls through */
          case PRE_DIGEST_STATE:
            if (animationDetails) {
              activeAnimationsLookup.remove(child);
            }
            break;
        }
      });
    }

    function clearElementAnimationState(element) {
      var node = getDomNode(element);
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);
      activeAnimationsLookup.remove(node);
    }

    function isMatchingElement(nodeOrElmA, nodeOrElmB) {
      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
    }

    function closeParentClassBasedAnimations(startingElement) {
      var parentNode = getDomNode(startingElement);
      do {
        if (!parentNode || parentNode.nodeType !== ELEMENT_NODE) break;

        var animationDetails = activeAnimationsLookup.get(parentNode);
        if (animationDetails) {
          examineParentAnimation(parentNode, animationDetails);
        }

        parentNode = parentNode.parentNode;
      } while (true);

      // since animations are detected from CSS classes, we need to flush all parent
      // class-based animations so that the parent classes are all present for child
      // animations to properly function (otherwise any CSS selectors may not work)
      function examineParentAnimation(node, animationDetails) {
        // enter/leave/move always have priority
        if (animationDetails.structural || !hasAnimationClasses(animationDetails.options)) return;

        if (animationDetails.state === RUNNING_STATE) {
          animationDetails.runner.end();
        }
        clearElementAnimationState(node);
      }
    }

    function areAnimationsAllowed(element, parentElement, event) {
      var bodyElementDetected = false;
      var rootElementDetected = false;
      var parentAnimationDetected = false;
      var animateChildren;

      var parentHost = element.data(NG_ANIMATE_PIN_DATA);
      if (parentHost) {
        parentElement = parentHost;
      }

      while (parentElement && parentElement.length) {
        if (!rootElementDetected) {
          // angular doesn't want to attempt to animate elements outside of the application
          // therefore we need to ensure that the rootElement is an ancestor of the current element
          rootElementDetected = isMatchingElement(parentElement, $rootElement);
        }

        var parentNode = parentElement[0];
        if (parentNode.nodeType !== ELEMENT_NODE) {
          // no point in inspecting the #document element
          break;
        }

        var details = activeAnimationsLookup.get(parentNode) || {};
        // either an enter, leave or move animation will commence
        // therefore we can't allow any animations to take place
        // but if a parent animation is class-based then that's ok
        if (!parentAnimationDetected) {
          parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode);
        }

        if (isUndefined(animateChildren) || animateChildren === true) {
          var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);
          if (isDefined(value)) {
            animateChildren = value;
          }
        }

        // there is no need to continue traversing at this point
        if (parentAnimationDetected && animateChildren === false) break;

        if (!rootElementDetected) {
          // angular doesn't want to attempt to animate elements outside of the application
          // therefore we need to ensure that the rootElement is an ancestor of the current element
          rootElementDetected = isMatchingElement(parentElement, $rootElement);
          if (!rootElementDetected) {
            parentHost = parentElement.data(NG_ANIMATE_PIN_DATA);
            if (parentHost) {
              parentElement = parentHost;
            }
          }
        }

        if (!bodyElementDetected) {
          // we also need to ensure that the element is or will be apart of the body element
          // otherwise it is pointless to even issue an animation to be rendered
          bodyElementDetected = isMatchingElement(parentElement, bodyElement);
        }

        parentElement = parentElement.parent();
      }

      var allowAnimation = !parentAnimationDetected || animateChildren;
      return allowAnimation && rootElementDetected && bodyElementDetected;
    }

    function markElementAnimationState(element, state, details) {
      details = details || {};
      details.state = state;

      var node = getDomNode(element);
      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);

      var oldValue = activeAnimationsLookup.get(node);
      var newValue = oldValue
          ? extend(oldValue, details)
          : details;
      activeAnimationsLookup.put(node, newValue);
    }
  }];
}];

var $$rAFMutexFactory = ['$$rAF', function($$rAF) {
  return function() {
    var passed = false;
    $$rAF(function() {
      passed = true;
    });
    return function(fn) {
      passed ? fn() : $$rAF(fn);
    };
  };
}];

var $$AnimateRunnerFactory = ['$q', '$$rAFMutex', function($q, $$rAFMutex) {
  var INITIAL_STATE = 0;
  var DONE_PENDING_STATE = 1;
  var DONE_COMPLETE_STATE = 2;

  AnimateRunner.chain = function(chain, callback) {
    var index = 0;

    next();
    function next() {
      if (index === chain.length) {
        callback(true);
        return;
      }

      chain[index](function(response) {
        if (response === false) {
          callback(false);
          return;
        }
        index++;
        next();
      });
    }
  };

  AnimateRunner.all = function(runners, callback) {
    var count = 0;
    var status = true;
    forEach(runners, function(runner) {
      runner.done(onProgress);
    });

    function onProgress(response) {
      status = status && response;
      if (++count === runners.length) {
        callback(status);
      }
    }
  };

  function AnimateRunner(host) {
    this.setHost(host);

    this._doneCallbacks = [];
    this._runInAnimationFrame = $$rAFMutex();
    this._state = 0;
  }

  AnimateRunner.prototype = {
    setHost: function(host) {
      this.host = host || {};
    },

    done: function(fn) {
      if (this._state === DONE_COMPLETE_STATE) {
        fn();
      } else {
        this._doneCallbacks.push(fn);
      }
    },

    progress: noop,

    getPromise: function() {
      if (!this.promise) {
        var self = this;
        this.promise = $q(function(resolve, reject) {
          self.done(function(status) {
            status === false ? reject() : resolve();
          });
        });
      }
      return this.promise;
    },

    then: function(resolveHandler, rejectHandler) {
      return this.getPromise().then(resolveHandler, rejectHandler);
    },

    'catch': function(handler) {
      return this.getPromise()['catch'](handler);
    },

    'finally': function(handler) {
      return this.getPromise()['finally'](handler);
    },

    pause: function() {
      if (this.host.pause) {
        this.host.pause();
      }
    },

    resume: function() {
      if (this.host.resume) {
        this.host.resume();
      }
    },

    end: function() {
      if (this.host.end) {
        this.host.end();
      }
      this._resolve(true);
    },

    cancel: function() {
      if (this.host.cancel) {
        this.host.cancel();
      }
      this._resolve(false);
    },

    complete: function(response) {
      var self = this;
      if (self._state === INITIAL_STATE) {
        self._state = DONE_PENDING_STATE;
        self._runInAnimationFrame(function() {
          self._resolve(response);
        });
      }
    },

    _resolve: function(response) {
      if (this._state !== DONE_COMPLETE_STATE) {
        forEach(this._doneCallbacks, function(fn) {
          fn(response);
        });
        this._doneCallbacks.length = 0;
        this._state = DONE_COMPLETE_STATE;
      }
    }
  };

  return AnimateRunner;
}];

var $$AnimationProvider = ['$animateProvider', function($animateProvider) {
  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';

  var drivers = this.drivers = [];

  var RUNNER_STORAGE_KEY = '$$animationRunner';

  function setRunner(element, runner) {
    element.data(RUNNER_STORAGE_KEY, runner);
  }

  function removeRunner(element) {
    element.removeData(RUNNER_STORAGE_KEY);
  }

  function getRunner(element) {
    return element.data(RUNNER_STORAGE_KEY);
  }

  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$rAFScheduler',
       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$rAFScheduler) {

    var animationQueue = [];
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    var totalPendingClassBasedAnimations = 0;
    var totalActiveClassBasedAnimations = 0;
    var classBasedAnimationsQueue = [];

    // TODO(matsko): document the signature in a better way
    return function(element, event, options) {
      options = prepareAnimationOptions(options);
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;

      // there is no animation at the current moment, however
      // these runner methods will get later updated with the
      // methods leading into the driver's end/cancel methods
      // for now they just stop the animation from starting
      var runner = new $$AnimateRunner({
        end: function() { close(); },
        cancel: function() { close(true); }
      });

      if (!drivers.length) {
        close();
        return runner;
      }

      setRunner(element, runner);

      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));
      var tempClasses = options.tempClasses;
      if (tempClasses) {
        classes += ' ' + tempClasses;
        options.tempClasses = null;
      }

      var classBasedIndex;
      if (!isStructural) {
        classBasedIndex = totalPendingClassBasedAnimations;
        totalPendingClassBasedAnimations += 1;
      }

      animationQueue.push({
        // this data is used by the postDigest code and passed into
        // the driver step function
        element: element,
        classes: classes,
        event: event,
        classBasedIndex: classBasedIndex,
        structural: isStructural,
        options: options,
        beforeStart: beforeStart,
        close: close
      });

      element.on('$destroy', handleDestroyedElement);

      // we only want there to be one function called within the post digest
      // block. This way we can group animations for all the animations that
      // were apart of the same postDigest flush call.
      if (animationQueue.length > 1) return runner;

      $rootScope.$$postDigest(function() {
        totalActiveClassBasedAnimations = totalPendingClassBasedAnimations;
        totalPendingClassBasedAnimations = 0;
        classBasedAnimationsQueue.length = 0;

        var animations = [];
        forEach(animationQueue, function(entry) {
          // the element was destroyed early on which removed the runner
          // form its storage. This means we can't animate this element
          // at all and it already has been closed due to destruction.
          if (getRunner(entry.element)) {
            animations.push(entry);
          }
        });

        // now any future animations will be in another postDigest
        animationQueue.length = 0;

        forEach(groupAnimations(animations), function(animationEntry) {
          if (animationEntry.structural) {
            triggerAnimationStart();
          } else {
            classBasedAnimationsQueue.push({
              node: getDomNode(animationEntry.element),
              fn: triggerAnimationStart
            });

            if (animationEntry.classBasedIndex === totalActiveClassBasedAnimations - 1) {
              // we need to sort each of the animations in order of parent to child
              // relationships. This ensures that the child classes are applied at the
              // right time.
              classBasedAnimationsQueue = classBasedAnimationsQueue.sort(function(a,b) {
                return b.node.contains(a.node);
              }).map(function(entry) {
                return entry.fn;
              });

              $$rAFScheduler(classBasedAnimationsQueue);
            }
          }

          function triggerAnimationStart() {
            // it's important that we apply the `ng-animate` CSS class and the
            // temporary classes before we do any driver invoking since these
            // CSS classes may be required for proper CSS detection.
            animationEntry.beforeStart();

            var startAnimationFn, closeFn = animationEntry.close;

            // in the event that the element was removed before the digest runs or
            // during the RAF sequencing then we should not trigger the animation.
            var targetElement = animationEntry.anchors
                ? (animationEntry.from.element || animationEntry.to.element)
                : animationEntry.element;

            if (getRunner(targetElement) && getDomNode(targetElement).parentNode) {
              var operation = invokeFirstDriver(animationEntry);
              if (operation) {
                startAnimationFn = operation.start;
              }
            }

            if (!startAnimationFn) {
              closeFn();
            } else {
              var animationRunner = startAnimationFn();
              animationRunner.done(function(status) {
                closeFn(!status);
              });
              updateAnimationRunners(animationEntry, animationRunner);
            }
          }
        });
      });

      return runner;

      // TODO(matsko): change to reference nodes
      function getAnchorNodes(node) {
        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';
        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)
              ? [node]
              : node.querySelectorAll(SELECTOR);
        var anchors = [];
        forEach(items, function(node) {
          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
          if (attr && attr.length) {
            anchors.push(node);
          }
        });
        return anchors;
      }

      function groupAnimations(animations) {
        var preparedAnimations = [];
        var refLookup = {};
        forEach(animations, function(animation, index) {
          var element = animation.element;
          var node = getDomNode(element);
          var event = animation.event;
          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;
          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];

          if (anchorNodes.length) {
            var direction = enterOrMove ? 'to' : 'from';

            forEach(anchorNodes, function(anchor) {
              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
              refLookup[key] = refLookup[key] || {};
              refLookup[key][direction] = {
                animationID: index,
                element: jqLite(anchor)
              };
            });
          } else {
            preparedAnimations.push(animation);
          }
        });

        var usedIndicesLookup = {};
        var anchorGroups = {};
        forEach(refLookup, function(operations, key) {
          var from = operations.from;
          var to = operations.to;

          if (!from || !to) {
            // only one of these is set therefore we can't have an
            // anchor animation since all three pieces are required
            var index = from ? from.animationID : to.animationID;
            var indexKey = index.toString();
            if (!usedIndicesLookup[indexKey]) {
              usedIndicesLookup[indexKey] = true;
              preparedAnimations.push(animations[index]);
            }
            return;
          }

          var fromAnimation = animations[from.animationID];
          var toAnimation = animations[to.animationID];
          var lookupKey = from.animationID.toString();
          if (!anchorGroups[lookupKey]) {
            var group = anchorGroups[lookupKey] = {
              structural: true,
              beforeStart: function() {
                fromAnimation.beforeStart();
                toAnimation.beforeStart();
              },
              close: function() {
                fromAnimation.close();
                toAnimation.close();
              },
              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
              from: fromAnimation,
              to: toAnimation,
              anchors: [] // TODO(matsko): change to reference nodes
            };

            // the anchor animations require that the from and to elements both have at least
            // one shared CSS class which effictively marries the two elements together to use
            // the same animation driver and to properly sequence the anchor animation.
            if (group.classes.length) {
              preparedAnimations.push(group);
            } else {
              preparedAnimations.push(fromAnimation);
              preparedAnimations.push(toAnimation);
            }
          }

          anchorGroups[lookupKey].anchors.push({
            'out': from.element, 'in': to.element
          });
        });

        return preparedAnimations;
      }

      function cssClassesIntersection(a,b) {
        a = a.split(' ');
        b = b.split(' ');
        var matches = [];

        for (var i = 0; i < a.length; i++) {
          var aa = a[i];
          if (aa.substring(0,3) === 'ng-') continue;

          for (var j = 0; j < b.length; j++) {
            if (aa === b[j]) {
              matches.push(aa);
              break;
            }
          }
        }

        return matches.join(' ');
      }

      function invokeFirstDriver(animationDetails) {
        // we loop in reverse order since the more general drivers (like CSS and JS)
        // may attempt more elements, but custom drivers are more particular
        for (var i = drivers.length - 1; i >= 0; i--) {
          var driverName = drivers[i];
          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check

          var factory = $injector.get(driverName);
          var driver = factory(animationDetails);
          if (driver) {
            return driver;
          }
        }
      }

      function beforeStart() {
        element.addClass(NG_ANIMATE_CLASSNAME);
        if (tempClasses) {
          $$jqLite.addClass(element, tempClasses);
        }
      }

      function updateAnimationRunners(animation, newRunner) {
        if (animation.from && animation.to) {
          update(animation.from.element);
          update(animation.to.element);
        } else {
          update(animation.element);
        }

        function update(element) {
          getRunner(element).setHost(newRunner);
        }
      }

      function handleDestroyedElement() {
        var runner = getRunner(element);
        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {
          runner.end();
        }
      }

      function close(rejected) { // jshint ignore:line
        element.off('$destroy', handleDestroyedElement);
        removeRunner(element);

        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);
        options.domOperation();

        if (tempClasses) {
          $$jqLite.removeClass(element, tempClasses);
        }

        element.removeClass(NG_ANIMATE_CLASSNAME);
        runner.complete(!rejected);
      }
    };
  }];
}];

/* global angularAnimateModule: true,

   $$rAFMutexFactory,
   $$rAFSchedulerFactory,
   $$AnimateChildrenDirective,
   $$AnimateRunnerFactory,
   $$AnimateQueueProvider,
   $$AnimationProvider,
   $AnimateCssProvider,
   $$AnimateCssDriverProvider,
   $$AnimateJsProvider,
   $$AnimateJsDriverProvider,
*/

/**
 * @ngdoc module
 * @name ngAnimate
 * @description
 *
 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` then the animation hooks are enabled for an Angular app.
 *
 * <div doc-module-components="ngAnimate"></div>
 *
 * # Usage
 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
 * the HTML element that the animation will be triggered on.
 *
 * ## Directive Support
 * The following directives are "animation aware":
 *
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *
 * (More information can be found by visiting each the documentation associated with each directive.)
 *
 * ## CSS-based Animations
 *
 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
 *
 * The example below shows how an `enter` animation can be made possible on a element using `ng-if`:
 *
 * ```html
 * <div ng-if="bool" class="fade">
 *    Fade me in out
 * </div>
 * <button ng-click="bool=true">Fade In!</button>
 * <button ng-click="bool=false">Fade Out!</button>
 * ```
 *
 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:
 *
 * ```css
 * /&#42; The starting CSS styles for the enter animation &#42;/
 * .fade.ng-enter {
 *   transition:0.5s linear all;
 *   opacity:0;
 * }
 *
 * /&#42; The finishing CSS styles for the enter animation &#42;/
 * .fade.ng-enter.ng-enter-active {
 *   opacity:1;
 * }
 * ```
 *
 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
 *
 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
 *
 * ```css
 * /&#42; now the element will fade out before it is removed from the DOM &#42;/
 * .fade.ng-leave {
 *   transition:0.5s linear all;
 *   opacity:1;
 * }
 * .fade.ng-leave.ng-leave-active {
 *   opacity:0;
 * }
 * ```
 *
 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:
 *
 * ```css
 * /&#42; there is no need to define anything inside of the destination
 * CSS class since the keyframe will take charge of the animation &#42;/
 * .fade.ng-leave {
 *   animation: my_fade_animation 0.5s linear;
 *   -webkit-animation: my_fade_animation 0.5s linear;
 * }
 *
 * @keyframes my_fade_animation {
 *   from { opacity:1; }
 *   to { opacity:0; }
 * }
 *
 * @-webkit-keyframes my_fade_animation {
 *   from { opacity:1; }
 *   to { opacity:0; }
 * }
 * ```
 *
 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.
 *
 * ### CSS Class-based Animations
 *
 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
 * and removed.
 *
 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class:
 *
 * ```html
 * <div ng-show="bool" class="fade">
 *   Show and hide me
 * </div>
 * <button ng-click="bool=true">Toggle</button>
 *
 * <style>
 * .fade.ng-hide {
 *   transition:0.5s linear all;
 *   opacity:0;
 * }
 * </style>
 * ```
 *
 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.
 *
 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
 * with CSS styles.
 *
 * ```html
 * <div ng-class="{on:onOff}" class="highlight">
 *   Highlight this box
 * </div>
 * <button ng-click="onOff=!onOff">Toggle</button>
 *
 * <style>
 * .highlight {
 *   transition:0.5s linear all;
 * }
 * .highlight.on-add {
 *   background:white;
 * }
 * .highlight.on {
 *   background:yellow;
 * }
 * .highlight.on-remove {
 *   background:black;
 * }
 * </style>
 * ```
 *
 * We can also make use of CSS keyframes by placing them within the CSS classes.
 *
 *
 * ### CSS Staggering Animations
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).
 *
 * ```css
 * .my-animation.ng-enter {
 *   /&#42; standard transition code &#42;/
 *   transition: 1s linear all;
 *   opacity:0;
 * }
 * .my-animation.ng-enter-stagger {
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/
 *   transition-delay: 0.1s;
 *
 *   /&#42; in case the stagger doesn't work then the duration value
 *    must be set to 0 to avoid an accidental CSS inheritance &#42;/
 *   transition-duration: 0s;
 * }
 * .my-animation.ng-enter.ng-enter-active {
 *   /&#42; standard transition styles &#42;/
 *   opacity:1;
 * }
 * ```
 *
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.
 *
 * The following code will issue the **ng-leave-stagger** event on the element provided:
 *
 * ```js
 * var kids = parent.children();
 *
 * $animate.leave(kids[0]); //stagger index=0
 * $animate.leave(kids[1]); //stagger index=1
 * $animate.leave(kids[2]); //stagger index=2
 * $animate.leave(kids[3]); //stagger index=3
 * $animate.leave(kids[4]); //stagger index=4
 *
 * window.requestAnimationFrame(function() {
 *   //stagger has reset itself
 *   $animate.leave(kids[5]); //stagger index=0
 *   $animate.leave(kids[6]); //stagger index=1
 *
 *   $scope.$digest();
 * });
 * ```
 *
 * Stagger animations are currently only supported within CSS-defined animations.
 *
 * ### The `ng-animate` CSS class
 *
 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
 *
 * Therefore, animations can be applied to an element using this temporary class directly via CSS.
 *
 * ```css
 * .zipper.ng-animate {
 *   transition:0.5s linear all;
 * }
 * .zipper.ng-enter {
 *   opacity:0;
 * }
 * .zipper.ng-enter.ng-enter-active {
 *   opacity:1;
 * }
 * .zipper.ng-leave {
 *   opacity:1;
 * }
 * .zipper.ng-leave.ng-leave-active {
 *   opacity:0;
 * }
 * ```
 *
 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
 * the CSS class once an animation has completed.)
 *
 *
 * ## JavaScript-based Animations
 *
 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
 * `module.animation()` module function we can register the ainmation.
 *
 * Let's see an example of a enter/leave animation using `ngRepeat`:
 *
 * ```html
 * <div ng-repeat="item in items" class="slide">
 *   {{ item }}
 * </div>
 * ```
 *
 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
 *
 * ```js
 * myModule.animation('.slide', [function() {
 *   return {
 *     // make note that other events (like addClass/removeClass)
 *     // have different function input parameters
 *     enter: function(element, doneFn) {
 *       jQuery(element).fadeIn(1000, doneFn);
 *
 *       // remember to call doneFn so that angular
 *       // knows that the animation has concluded
 *     },
 *
 *     move: function(element, doneFn) {
 *       jQuery(element).fadeIn(1000, doneFn);
 *     },
 *
 *     leave: function(element, doneFn) {
 *       jQuery(element).fadeOut(1000, doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
 * greensock.js and velocity.js.
 *
 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
 * our animations inside of the same registered animation, however, the function input arguments are a bit different:
 *
 * ```html
 * <div ng-class="color" class="colorful">
 *   this box is moody
 * </div>
 * <button ng-click="color='red'">Change to red</button>
 * <button ng-click="color='blue'">Change to blue</button>
 * <button ng-click="color='green'">Change to green</button>
 * ```
 *
 * ```js
 * myModule.animation('.colorful', [function() {
 *   return {
 *     addClass: function(element, className, doneFn) {
 *       // do some cool animation and call the doneFn
 *     },
 *     removeClass: function(element, className, doneFn) {
 *       // do some cool animation and call the doneFn
 *     },
 *     setClass: function(element, addedClass, removedClass, doneFn) {
 *       // do some cool animation and call the doneFn
 *     }
 *   }
 * }]
 * ```
 *
 * ## CSS + JS Animations Together
 *
 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
 * charge of the animation**:
 *
 * ```html
 * <div ng-if="bool" class="slide">
 *   Slide in and out
 * </div>
 * ```
 *
 * ```js
 * myModule.animation('.slide', [function() {
 *   return {
 *     enter: function(element, doneFn) {
 *       jQuery(element).slideIn(1000, doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * ```css
 * .slide.ng-enter {
 *   transition:0.5s linear all;
 *   transform:translateY(-100px);
 * }
 * .slide.ng-enter.ng-enter-active {
 *   transform:translateY(0);
 * }
 * ```
 *
 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
 * our own JS-based animation code:
 *
 * ```js
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.
 *       var runner = $animateCss(element, {
 *         event: 'enter',
 *         structural: true
 *       }).start();
*        runner.done(doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
 *
 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
 * data into `$animateCss` directly:
 *
 * ```js
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var runner = $animateCss(element, {
 *         event: 'enter',
 *         addClass: 'maroon-setting',
 *         from: { height:0 },
 *         to: { height: 200 }
 *       }).start();
 *
 *       runner.done(doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * Now we can fill in the rest via our transition CSS code:
 *
 * ```css
 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/
 * .slide.ng-enter { transition:0.5s linear all; }
 *
 * /&#42; this extra CSS class will be absorbed into the transition
 * since the $animateCss code is adding the class &#42;/
 * .maroon-setting { background:red; }
 * ```
 *
 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
 *
 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.
 *
 * ## Animation Anchoring (via `ng-animate-ref`)
 *
 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between
 * structural areas of an application (like views) by pairing up elements using an attribute
 * called `ng-animate-ref`.
 *
 * Let's say for example we have two views that are managed by `ng-view` and we want to show
 * that there is a relationship between two components situated in within these views. By using the
 * `ng-animate-ref` attribute we can identify that the two components are paired together and we
 * can then attach an animation, which is triggered when the view changes.
 *
 * Say for example we have the following template code:
 *
 * ```html
 * <!-- index.html -->
 * <div ng-view class="view-animation">
 * </div>
 *
 * <!-- home.html -->
 * <a href="#/banner-page">
 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
 * </a>
 *
 * <!-- banner-page.html -->
 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
 * ```
 *
 * Now, when the view changes (once the link is clicked), ngAnimate will examine the
 * HTML contents to see if there is a match reference between any components in the view
 * that is leaving and the view that is entering. It will scan both the view which is being
 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that
 * contain a matching ref value.
 *
 * The two images match since they share the same ref value. ngAnimate will now create a
 * transport element (which is a clone of the first image element) and it will then attempt
 * to animate to the position of the second image element in the next view. For the animation to
 * work a special CSS class called `ng-anchor` will be added to the transported element.
 *
 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then
 * ngAnimate will handle the entire transition for us as well as the addition and removal of
 * any changes of CSS classes between the elements:
 *
 * ```css
 * .banner.ng-anchor {
 *   /&#42; this animation will last for 1 second since there are
 *          two phases to the animation (an `in` and an `out` phase) &#42;/
 *   transition:0.5s linear all;
 * }
 * ```
 *
 * We also **must** include animations for the views that are being entered and removed
 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).
 *
 * ```css
 * .view-animation.ng-enter, .view-animation.ng-leave {
 *   transition:0.5s linear all;
 *   position:fixed;
 *   left:0;
 *   top:0;
 *   width:100%;
 * }
 * .view-animation.ng-enter {
 *   transform:translateX(100%);
 * }
 * .view-animation.ng-leave,
 * .view-animation.ng-enter.ng-enter-active {
 *   transform:translateX(0%);
 * }
 * .view-animation.ng-leave.ng-leave-active {
 *   transform:translateX(-100%);
 * }
 * ```
 *
 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:
 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away
 * from its origin. Once that animation is over then the `in` stage occurs which animates the
 * element to its destination. The reason why there are two animations is to give enough time
 * for the enter animation on the new element to be ready.
 *
 * The example above sets up a transition for both the in and out phases, but we can also target the out or
 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.
 *
 * ```css
 * .banner.ng-anchor-out {
 *   transition: 0.5s linear all;
 *
 *   /&#42; the scale will be applied during the out animation,
 *          but will be animated away when the in animation runs &#42;/
 *   transform: scale(1.2);
 * }
 *
 * .banner.ng-anchor-in {
 *   transition: 1s linear all;
 * }
 * ```
 *
 *
 *
 *
 * ### Anchoring Demo
 *
  <example module="anchoringExample"
           name="anchoringExample"
           id="anchoringExample"
           deps="angular-animate.js;angular-route.js"
           animations="true">
    <file name="index.html">
      <a href="#/">Home</a>
      <hr />
      <div class="view-container">
        <div ng-view class="view"></div>
      </div>
    </file>
    <file name="script.js">
      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController as home'
          });
          $routeProvider.when('/profile/:id', {
            templateUrl: 'profile.html',
            controller: 'ProfileController as profile'
          });
        }])
        .run(['$rootScope', function($rootScope) {
          $rootScope.records = [
            { id:1, title: "Miss Beulah Roob" },
            { id:2, title: "Trent Morissette" },
            { id:3, title: "Miss Ava Pouros" },
            { id:4, title: "Rod Pouros" },
            { id:5, title: "Abdul Rice" },
            { id:6, title: "Laurie Rutherford Sr." },
            { id:7, title: "Nakia McLaughlin" },
            { id:8, title: "Jordon Blanda DVM" },
            { id:9, title: "Rhoda Hand" },
            { id:10, title: "Alexandrea Sauer" }
          ];
        }])
        .controller('HomeController', [function() {
          //empty
        }])
        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {
          var index = parseInt($routeParams.id, 10);
          var record = $rootScope.records[index - 1];

          this.title = record.title;
          this.id = record.id;
        }]);
    </file>
    <file name="home.html">
      <h2>Welcome to the home page</h1>
      <p>Please click on an element</p>
      <a class="record"
         ng-href="#/profile/{{ record.id }}"
         ng-animate-ref="{{ record.id }}"
         ng-repeat="record in records">
        {{ record.title }}
      </a>
    </file>
    <file name="profile.html">
      <div class="profile record" ng-animate-ref="{{ profile.id }}">
        {{ profile.title }}
      </div>
    </file>
    <file name="animations.css">
      .record {
        display:block;
        font-size:20px;
      }
      .profile {
        background:black;
        color:white;
        font-size:100px;
      }
      .view-container {
        position:relative;
      }
      .view-container > .view.ng-animate {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        min-height:500px;
      }
      .view.ng-enter, .view.ng-leave,
      .record.ng-anchor {
        transition:0.5s linear all;
      }
      .view.ng-enter {
        transform:translateX(100%);
      }
      .view.ng-enter.ng-enter-active, .view.ng-leave {
        transform:translateX(0%);
      }
      .view.ng-leave.ng-leave-active {
        transform:translateX(-100%);
      }
      .record.ng-anchor-out {
        background:red;
      }
    </file>
  </example>
 *
 * ### How is the element transported?
 *
 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element
 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match
 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
 * will become visible since the shim class will be removed.
 *
 * ### How is the morphing handled?
 *
 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out
 * what CSS classes differ between the starting element and the destination element. These different CSS classes
 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided
 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will
 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that
 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since
 * the cloned element is placed inside of root element which is likely close to the body element).
 *
 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.
 *
 *
 * ## Using $animate in your directive code
 *
 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
 * imagine we have a greeting box that shows and hides itself when the data changes
 *
 * ```html
 * <greeting-box active="onOrOff">Hi there</greeting-box>
 * ```
 *
 * ```js
 * ngModule.directive('greetingBox', ['$animate', function($animate) {
 *   return function(scope, element, attrs) {
 *     attrs.$observe('active', function(value) {
 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');
 *     });
 *   });
 * }]);
 * ```
 *
 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
 * in our HTML code then we can trigger a CSS or JS animation to happen.
 *
 * ```css
 * /&#42; normally we would create a CSS class to reference on the element &#42;/
 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }
 * ```
 *
 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
 * possible be sure to visit the {@link ng.$animate $animate service API page}.
 *
 *
 * ### Preventing Collisions With Third Party Libraries
 *
 * Some third-party frameworks place animation duration defaults across many element or className
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which
 * is expecting actual animations on these elements and has to wait for their completion.
 *
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:
 *
 * ```css
 * /&#42; prefixed with animate- &#42;/
 * .animate-fade-add.animate-fade-add-active {
 *   transition:1s linear all;
 *   opacity:0;
 * }
 * ```
 *
 * You then configure `$animate` to enforce this prefix:
 *
 * ```js
 * $animateProvider.classNameFilter(/animate-/);
 * ```
 *
 * This also may provide your application with a speed boost since only specific elements containing CSS class prefix
 * will be evaluated for animation when any DOM changes occur in the application.
 *
 * ## Callbacks and Promises
 *
 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
 * ended by chaining onto the returned promise that animation method returns.
 *
 * ```js
 * // somewhere within the depths of the directive
 * $animate.enter(element, parent).then(function() {
 *   //the animation has completed
 * });
 * ```
 *
 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
 * anymore.)
 *
 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view
 * routing controller to hook into that:
 *
 * ```js
 * ngModule.controller('HomePageController', ['$animate', function($animate) {
 *   $animate.on('enter', ngViewElement, function(element) {
 *     // the animation for this route has completed
 *   }]);
 * }])
 * ```
 *
 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
 */

/**
 * @ngdoc service
 * @name $animate
 * @kind object
 *
 * @description
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.
 *
 * Click here {@link ng.$animate $animate to learn more about animations with `$animate`}.
 */
angular.module('ngAnimate', [])
  .directive('ngAnimateChildren', $$AnimateChildrenDirective)

  .factory('$$rAFMutex', $$rAFMutexFactory)
  .factory('$$rAFScheduler', $$rAFSchedulerFactory)

  .factory('$$AnimateRunner', $$AnimateRunnerFactory)

  .provider('$$animateQueue', $$AnimateQueueProvider)
  .provider('$$animation', $$AnimationProvider)

  .provider('$animateCss', $AnimateCssProvider)
  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)

  .provider('$$animateJs', $$AnimateJsProvider)
  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);


})(window, window.angular);
;
/*
 Leaflet 1.0.0-beta.2 (954e83d), a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2015 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/
!function(t,e,i){function n(){var e=t.L;o.noConflict=function(){return t.L=e,this},t.L=o}var o={version:"1.0.0-beta.2"};"object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),"undefined"!=typeof t&&n(),o.Util={extend:function(t){var e,i,n,o;for(i=1,n=arguments.length;n>i;i++){o=arguments[i];for(e in o)t[e]=o[e]}return t},create:Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}(),bind:function(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}},stamp:function(t){return t._leaflet_id=t._leaflet_id||++o.Util.lastId,t._leaflet_id},lastId:0,throttle:function(t,e,i){var n,o,s,r;return r=function(){n=!1,o&&(s.apply(i,o),o=!1)},s=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(r,e),n=!0)}},wrapNum:function(t,e,i){var n=e[1],o=e[0],s=n-o;return t===n&&i?t:((t-o)%s+s)%s+o},falseFn:function(){return!1},formatNum:function(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return o.Util.trim(t).split(/\s+/)},setOptions:function(t,e){t.hasOwnProperty("options")||(t.options=t.options?o.Util.create(t.options):{});for(var i in e)t.options[i]=e[i];return t.options},getParamString:function(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(e&&-1!==e.indexOf("?")?"&":"?")+n.join("&")},template:function(t,e){return t.replace(o.Util.templateRe,function(t,n){var o=e[n];if(o===i)throw new Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o})},templateRe:/\{ *([\w_]+) *\}/g,isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},indexOf:function(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){return t["webkit"+e]||t["moz"+e]||t["ms"+e]}function i(e){var i=+new Date,o=Math.max(0,16-(i-n));return n=i+o,t.setTimeout(e,o)}var n=0,s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,r=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e)};o.Util.requestAnimFrame=function(e,n,r){return r&&s===i?void e.call(n):s.call(t,o.bind(e,n))},o.Util.cancelAnimFrame=function(e){e&&r.call(t,e)}}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=o.Util.create(i);n.constructor=e,e.prototype=n;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);return t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),n.options&&(t.options=o.Util.extend(o.Util.create(n.options),t.options)),o.extend(n,t),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;e>t;t++)n._initHooks[t].call(this)}},e},o.Class.include=function(t){o.extend(this.prototype,t)},o.Class.mergeOptions=function(t){o.extend(this.prototype.options,t)},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i)},o.Evented=o.Class.extend({on:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e);else{t=o.Util.splitWords(t);for(var s=0,r=t.length;r>s;s++)this._on(t[s],e,i)}return this},off:function(t,e,i){if(t)if("object"==typeof t)for(var n in t)this._off(n,t[n],e);else{t=o.Util.splitWords(t);for(var s=0,r=t.length;r>s;s++)this._off(t[s],e,i)}else delete this._events;return this},_on:function(t,e,i){var n=this._events=this._events||{},s=i&&i!==this&&o.stamp(i);if(s){var r=t+"_idx",a=t+"_len",h=n[r]=n[r]||{},l=o.stamp(e)+"_"+s;h[l]||(h[l]={fn:e,ctx:i},n[a]=(n[a]||0)+1)}else n[t]=n[t]||[],n[t].push({fn:e})},_off:function(t,e,i){var n=this._events,s=t+"_idx",r=t+"_len";if(n){if(!e)return delete n[t],delete n[s],void delete n[r];var a,h,l,u,c,d=i&&i!==this&&o.stamp(i);if(d)c=o.stamp(e)+"_"+d,a=n[s],a&&a[c]&&(u=a[c],delete a[c],n[r]--);else if(a=n[t])for(h=0,l=a.length;l>h;h++)if(a[h].fn===e){u=a[h],a.splice(h,1);break}u&&(u.fn=o.Util.falseFn)}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=o.Util.extend({},e,{type:t,target:this}),s=this._events;if(s){var r,a,h,l,u=s[t+"_idx"];if(s[t])for(h=s[t].slice(),r=0,a=h.length;a>r;r++)h[r].fn.call(this,n);for(l in u)u[l].fn.call(u[l].ctx,n)}return i&&this._propagateEvent(n),this},listens:function(t,e){var i=this._events;if(i&&(i[t]||i[t+"_len"]))return!0;if(e)for(var n in this._eventParents)if(this._eventParents[n].listens(t,e))return!0;return!1},once:function(t,e,i){if("object"==typeof t){for(var n in t)this.once(n,t[n],e);return this}var s=o.bind(function(){this.off(t,e,i).off(t,s,i)},this);return this.on(t,e,i).on(t,s,i)},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[o.stamp(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[o.stamp(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,o.extend({layer:t.target},t),!0)}});var s=o.Evented.prototype;s.addEventListener=s.on,s.removeEventListener=s.clearAllEventListeners=s.off,s.addOneTimeEventListener=s.once,s.fireEvent=s.fire,s.hasEventListeners=s.listens,o.Mixin={Events:s},function(){var i=navigator.userAgent.toLowerCase(),n=e.documentElement,s="ActiveXObject"in t,r=-1!==i.indexOf("webkit"),a=-1!==i.indexOf("phantom"),h=-1!==i.search("android [23]"),l=-1!==i.indexOf("chrome"),u=-1!==i.indexOf("gecko")&&!r&&!t.opera&&!s,c="undefined"!=typeof orientation||-1!==i.indexOf("mobile"),d=!t.PointerEvent&&t.MSPointerEvent,_=t.PointerEvent&&navigator.pointerEnabled||d,m=s&&"transition"in n.style,p="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix&&!h,f="MozPerspective"in n.style,g="OTransition"in n.style,v=!t.L_NO_TOUCH&&!a&&(_||"ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch);o.Browser={ie:s,ielt9:s&&!e.addEventListener,webkit:r,gecko:u,android:-1!==i.indexOf("android"),android23:h,chrome:l,safari:!l&&-1!==i.indexOf("safari"),ie3d:m,webkit3d:p,gecko3d:f,opera12:g,any3d:!t.L_DISABLE_3D&&(m||p||f)&&!g&&!a,mobile:c,mobileWebkit:c&&r,mobileWebkit3d:c&&p,mobileOpera:c&&t.opera,mobileGecko:c&&u,touch:!!v,msPointer:!!d,pointer:!!_,retina:(t.devicePixelRatio||t.screen.deviceXDPI/t.screen.logicalXDPI)>1}}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e},o.Point.prototype={clone:function(){return new o.Point(this.x,this.y)},add:function(t){return this.clone()._add(o.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(o.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new o.Point(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new o.Point(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},distanceTo:function(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=o.point(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:new o.Point(t,e,n)},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.Bounds.prototype={extend:function(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new o.Point(this.min.x,this.max.y)},getTopRight:function(){return new o.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>=e.x&&n.x<=i.x,a=s.y>=e.y&&n.y<=i.y;return r&&a},overlaps:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>e.x&&n.x<i.x,a=s.y>e.y&&n.y<i.y;return r&&a},isValid:function(){return!(!this.min||!this.max)}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e)},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n},o.Transformation.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}},o.DomUtil={get:function(t){return"string"==typeof t?e.getElementById(t):t},getStyle:function(t,i){var n=t.style[i]||t.currentStyle&&t.currentStyle[i];if((!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null}return"auto"===n?null:n},create:function(t,i,n){var o=e.createElement(t);return o.className=i,n&&n.appendChild(o),o},remove:function(t){var e=t.parentNode;e&&e.removeChild(t)},empty:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},toFront:function(t){t.parentNode.appendChild(t)},toBack:function(t){var e=t.parentNode;e.insertBefore(t,e.firstChild)},hasClass:function(t,e){if(t.classList!==i)return t.classList.contains(e);var n=o.DomUtil.getClass(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)},addClass:function(t,e){if(t.classList!==i)for(var n=o.Util.splitWords(e),s=0,r=n.length;r>s;s++)t.classList.add(n[s]);else if(!o.DomUtil.hasClass(t,e)){var a=o.DomUtil.getClass(t);o.DomUtil.setClass(t,(a?a+" ":"")+e)}},removeClass:function(t,e){t.classList!==i?t.classList.remove(e):o.DomUtil.setClass(t,o.Util.trim((" "+o.DomUtil.getClass(t)+" ").replace(" "+e+" "," ")))},setClass:function(t,e){t.className.baseVal===i?t.className=e:t.className.baseVal=e},getClass:function(t){return t.className.baseVal===i?t.className:t.className.baseVal},setOpacity:function(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&o.DomUtil._setOpacityIE(t,e)},_setOpacityIE:function(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(o){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"},testProp:function(t){for(var i=e.documentElement.style,n=0;n<t.length;n++)if(t[n]in i)return t[n];return!1},setTransform:function(t,e,i){var n=e||new o.Point(0,0);t.style[o.DomUtil.TRANSFORM]=(o.Browser.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")},setPosition:function(t,e){t._leaflet_pos=e,o.Browser.any3d?o.DomUtil.setTransform(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")},getPosition:function(t){return t._leaflet_pos}},function(){o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]);var i=o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]);if(o.DomUtil.TRANSITION_END="webkitTransition"===i||"OTransition"===i?i+"End":"transitionend","onselectstart"in e)o.DomUtil.disableTextSelection=function(){o.DomEvent.on(t,"selectstart",o.DomEvent.preventDefault)},o.DomUtil.enableTextSelection=function(){o.DomEvent.off(t,"selectstart",o.DomEvent.preventDefault)};else{var n=o.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);o.DomUtil.disableTextSelection=function(){if(n){var t=e.documentElement.style;this._userSelect=t[n],t[n]="none"}},o.DomUtil.enableTextSelection=function(){n&&(e.documentElement.style[n]=this._userSelect,delete this._userSelect)}}o.DomUtil.disableImageDrag=function(){o.DomEvent.on(t,"dragstart",o.DomEvent.preventDefault)},o.DomUtil.enableImageDrag=function(){o.DomEvent.off(t,"dragstart",o.DomEvent.preventDefault)},o.DomUtil.preventOutline=function(e){for(;-1===e.tabIndex;)e=e.parentNode;e&&e.style&&(o.DomUtil.restoreOutline(),this._outlineElement=e,this._outlineStyle=e.style.outline,e.style.outline="none",o.DomEvent.on(t,"keydown",o.DomUtil.restoreOutline,this))},o.DomUtil.restoreOutline=function(){this._outlineElement&&(this._outlineElement.style.outline=this._outlineStyle,delete this._outlineElement,delete this._outlineStyle,o.DomEvent.off(t,"keydown",o.DomUtil.restoreOutline,this))}}(),o.LatLng=function(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,n!==i&&(this.alt=+n)},o.LatLng.prototype={equals:function(t,e){if(!t)return!1;t=o.latLng(t);var n=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return(e===i?1e-9:e)>=n},toString:function(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){return o.CRS.Earth.distance(this,o.latLng(t))},wrap:function(){return o.CRS.Earth.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return o.latLngBounds([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new o.LatLng(this.lat,this.lng,this.alt)}},o.latLng=function(t,e,n){return t instanceof o.LatLng?t:o.Util.isArray(t)&&"object"!=typeof t[0]?3===t.length?new o.LatLng(t[0],t[1],t[2]):2===t.length?new o.LatLng(t[0],t[1]):null:t===i||null===t?t:"object"==typeof t&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===i?null:new o.LatLng(t,e,n)},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;o>n;n++)this.extend(i[n])},o.LatLngBounds.prototype={extend:function(t){var e,i,n=this._southWest,s=this._northEast;if(t instanceof o.LatLng)e=t,i=t;else{if(!(t instanceof o.LatLngBounds))return t?this.extend(o.latLng(t)||o.latLngBounds(t)):this;if(e=t._southWest,i=t._northEast,!e||!i)return this}return n||s?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),s.lat=Math.max(i.lat,s.lat),s.lng=Math.max(i.lng,s.lng)):(this._southWest=new o.LatLng(e.lat,e.lng),this._northEast=new o.LatLng(i.lat,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s))},getCenter:function(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new o.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new o.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>=e.lat&&n.lat<=i.lat,a=s.lng>=e.lng&&n.lng<=i.lng;return r&&a},overlaps:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>e.lat&&n.lat<i.lat,a=s.lng>e.lng&&n.lng<i.lng;return r&&a},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t){return t?(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())):!1},isValid:function(){return!(!this._southWest||!this._northEast)}},o.latLngBounds=function(t,e){return!t||t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e)},o.Projection={},o.Projection.LonLat={project:function(t){return new o.Point(t.lng,t.lat)},unproject:function(t){return new o.LatLng(t.y,t.x)},bounds:o.bounds([-180,-90],[180,90])},o.Projection.SphericalMercator={R:6378137,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e);return new o.Point(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI;return new o.LatLng((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=6378137*Math.PI;return o.bounds([-t,-t],[t,t])}()},o.CRS={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i);return o.bounds(n,s)},wrapLatLng:function(t){var e=this.wrapLng?o.Util.wrapNum(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?o.Util.wrapNum(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return o.latLng(i,e,n)}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0}),o.CRS.Earth=o.extend({},o.CRS,{wrapLng:[-180,180],R:6378137,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin(n)*Math.sin(o)+Math.cos(n)*Math.cos(o)*Math.cos((e.lng-t.lng)*i);return this.R*Math.acos(Math.min(s,1))}}),o.CRS.EPSG3857=o.extend({},o.CRS.Earth,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:function(){var t=.5/(Math.PI*o.Projection.SphericalMercator.R);return new o.Transformation(t,.5,-t,.5)}()}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS.Earth,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/180,1,-1/180,.5)}),o.Map=o.Evented.extend({options:{crs:o.CRS.EPSG3857,fadeAnimation:!0,trackResize:!0,markerZoomAnimation:!0,maxBoundsViscosity:0,transform3DLimit:8388608},initialize:function(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._onResize=o.bind(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==i&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._addLayers(this.options.layers)},setView:function(t,e){return e=e===i?this.getZoom():e,this._resetView(o.latLng(t),e),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return this.setZoom(this._zoom+(t||1),e)},zoomOut:function(t,e){return this.setZoom(this._zoom-(t||1),e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),r=t instanceof o.Point?t:this.latLngToContainerPoint(t),a=r.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(a));return this.setView(h,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n));s=e.maxZoom?Math.min(e.maxZoom,s):s;var r=n.subtract(i).divideBy(2),a=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(a.add(h).divideBy(2).add(r),s);return{center:l,zoom:s}},fitBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t){return this.fire("movestart"),this._rawPanBy(o.point(t)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(t){return(t=o.latLngBounds(t))?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):this.off("moveend",this._panInsideMaxBounds)},setMinZoom:function(t){return this.options.minZoom=t,this._loaded&&this.getZoom()<this.options.minZoom?this.setZoom(t):this},setMaxZoom:function(t){return this.options.maxZoom=t,this._loaded&&this.getZoom()>this.options.maxZoom?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,o.latLngBounds(t));return i.equals(n)?this:(this.panTo(n,e),this._enforcingBounds=!1,this)},invalidateSize:function(t){if(!this._loaded)return this;t=o.extend({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),r=n.subtract(s);return r.x||r.y?(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},stop:function(){return o.Util.cancelAnimFrame(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){this._initEvents(!0);try{delete this._container._leaflet}catch(t){this._container._leaflet=i}o.DomUtil.remove(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload");for(var e in this._layers)this._layers[e].remove();return this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=o.DomUtil.create("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i)},getMinZoom:function(){return this.options.minZoom===i?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===i?this._layersMaxZoom===i?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=o.latLngBounds(t);var n,s=this.getMinZoom()-(e?1:0),r=this.getMaxZoom(),a=this.getSize(),h=t.getNorthWest(),l=t.getSouthEast(),u=!0;i=o.point(i||[0,0]);do s++,n=this.project(l,s).subtract(this.project(h,s)).add(i).floor(),u=e?n.x<a.x||n.y<a.y:a.contains(n);while(u&&r>=s);return u&&e?null:e?s:s-1},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new o.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new o.Bounds(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===i?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var n=this.options.crs;return e=e===i?this._zoom:e,n.scale(t)/n.scale(e)},getScaleZoom:function(t,e){var n=this.options.crs;return e=e===i?this._zoom:e,n.zoom(t*n.scale(e))},project:function(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e)},unproject:function(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e)},layerPointToLatLng:function(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(o.latLng(t))},distance:function(t,e){return this.options.crs.distance(o.latLng(t),o.latLng(e))},containerPointToLayerPoint:function(t){return o.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return o.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))},mouseEventToContainerPoint:function(t){return o.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=o.DomUtil.get(t);if(!e)throw new Error("Map container not found.");if(e._leaflet)throw new Error("Map container is already initialized.");o.DomEvent.addListener(e,"scroll",this._onScroll,this),e._leaflet=!0},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&o.Browser.any3d,o.DomUtil.addClass(t,"leaflet-container"+(o.Browser.touch?" leaflet-touch":"")+(o.Browser.retina?" leaflet-retina":"")+(o.Browser.ielt9?" leaflet-oldie":"")+(o.Browser.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,"leaflet-zoom-hide"),o.DomUtil.addClass(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e){o.DomUtil.setPosition(this._mapPane,new o.Point(0,0));var i=!this._loaded;this._loaded=!0,e=this._limitZoom(e);var n=this._zoom!==e;this._moveStart(n)._move(t,e)._moveEnd(n),this.fire("viewreset"),i&&this.fire("load")},_moveStart:function(t){return t&&this.fire("zoomstart"),this.fire("movestart")},_move:function(t,e,n){e===i&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),o&&this.fire("zoom",n),this.fire("move",n)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_rawPanBy:function(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){if(o.DomEvent){this._targets={},this._targets[o.stamp(this._container)]=this;var i=e?"off":"on";o.DomEvent[i](this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&o.DomEvent[i](t,"resize",this._onResize,this),o.Browser.any3d&&this.options.transform3DLimit&&this[i]("moveend",this._onMoveEnd)}},_onResize:function(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i,n=[],s="mouseout"===e||"mouseover"===e,r=t.target||t.srcElement;r;){if(i=this._targets[o.stamp(r)],i&&i.listens(e,!0)){if(s&&!o.DomEvent._isExternalTarget(r,t))break;if(n.push(i),s)break}if(r===this._container)break;r=r.parentNode}return n.length||s||!o.DomEvent._isExternalTarget(r,t)||(n=[this]),n},_handleDOMEvent:function(t){if(this._loaded&&!o.DomEvent._skipped(t)){var e="keypress"===t.type&&13===t.keyCode?"click":t.type;if("click"===t.type){var i=o.Util.extend({},t);i.type="preclick",this._handleDOMEvent(i)}"mousedown"===e&&o.DomUtil.preventOutline(t.target||t.srcElement),this._fireDOMEvent(t,e)}},_fireDOMEvent:function(t,e,i){if(!t._stopped&&(i=(i||[]).concat(this._findEventTargets(t,e)),i.length)){var n=i[0];if("contextmenu"===e&&n.listens(e,!0)&&o.DomEvent.preventDefault(t),"click"!==t.type&&"preclick"!==t.type||t._simulated||!this._draggableMoved(n)){var s={originalEvent:t};if("keypress"!==t.type){var r=n instanceof o.Marker;s.containerPoint=r?this.latLngToContainerPoint(n.getLatLng()):this.mouseEventToContainerPoint(t),s.layerPoint=this.containerPointToLayerPoint(s.containerPoint),s.latlng=r?n.getLatLng():this.layerPointToLatLng(s.layerPoint)}for(var a=0;a<i.length;a++)if(i[a].fire(e,s,!0),s.originalEvent._stopped||i[a].options.nonBubblingEvents&&-1!==o.Util.indexOf(i[a].options.nonBubblingEvents,e))return}}},_draggableMoved:function(t){return t=t.options.draggable?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;e>t;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return o.DomUtil.getPosition(this._mapPane)||new o.Point(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var n=t&&e!==i?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return n.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);
return this.project(t,e)._subtract(n)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),r=new o.Bounds(n.subtract(s),n.add(s)),a=this._getBoundsOffset(r,i,e);return this.unproject(n.add(a),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new o.Bounds(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=this.project(e.getNorthWest(),i).subtract(t.min),s=this.project(e.getSouthEast(),i).subtract(t.max),r=this._rebound(n.x,-s.x),a=this._rebound(n.y,-s.y);return new o.Point(r,a)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom();return o.Browser.any3d||(t=Math.round(t)),Math.max(e,Math.min(i,t))}}),o.map=function(t,e){return new o.Map(t,e)},o.Layer=o.Evented.extend({options:{pane:"overlayPane",nonBubblingEvents:[]},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[o.stamp(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[o.stamp(t)],this},_layerAdd:function(t){var e=t.target;e.hasLayer(this)&&(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents&&e.on(this.getEvents(),this),this.onAdd(e),this.getAttribution&&this._map.attributionControl&&this._map.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),e.fire("layeradd",{layer:this}))}}),o.Map.include({addLayer:function(t){var e=o.stamp(t);return this._layers[e]?t:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=o.stamp(t);return this._layers[e]?(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),t.getEvents&&this.off(t.getEvents(),t),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return!!t&&o.stamp(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?o.Util.isArray(t)?t:[t]:[];for(var e=0,i=t.length;i>e;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[o.stamp(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=o.stamp(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-(1/0),n=this._getZoomSpan();for(var o in this._zoomBoundLayers){var s=this._zoomBoundLayers[o].options;t=s.minZoom===i?t:Math.min(t,s.minZoom),e=s.maxZoom===i?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-(1/0)?i:e,this._layersMinZoom=t===1/0?i:t,n!==this._getZoomSpan()&&this.fire("zoomlevelschange")}}),o.Projection.Mercator={R:6378137,R_MINOR:6356752.314245179,bounds:o.bounds([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,r=Math.sqrt(1-s*s),a=r*Math.sin(n),h=Math.tan(Math.PI/4-n/2)/Math.pow((1-a)/(1+a),r/2);return n=-i*Math.log(Math.max(h,1e-10)),new o.Point(t.lng*e*i,n)},unproject:function(t){for(var e,i=180/Math.PI,n=this.R,s=this.R_MINOR/n,r=Math.sqrt(1-s*s),a=Math.exp(-t.y/n),h=Math.PI/2-2*Math.atan(a),l=0,u=.1;15>l&&Math.abs(u)>1e-7;l++)e=r*Math.sin(h),e=Math.pow((1-e)/(1+e),r/2),u=Math.PI/2-2*Math.atan(a*e)-h,h+=u;return new o.LatLng(h*i,t.x*i/n)}},o.CRS.EPSG3395=o.extend({},o.CRS.Earth,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=.5/(Math.PI*o.Projection.Mercator.R);return new o.Transformation(t,.5,-t,.5)}()}),o.GridLayer=o.Layer.extend({options:{pane:"tilePane",tileSize:256,opacity:1,zIndex:1,updateWhenIdle:o.Browser.mobile,updateInterval:200,attribution:null,bounds:null,minZoom:0},initialize:function(t){t=o.setOptions(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){o.DomUtil.remove(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=null},bringToFront:function(){return this._map&&(o.DomUtil.toFront(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(o.DomUtil.toBack(this._container),this._setAutoZIndex(Math.min)),this},getAttribution:function(){return this.options.attribution},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var t={viewreset:this._resetAll,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=o.Util.throttle(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return e.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof o.Point?t:new o.Point(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==i&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,i=this.getPane().children,n=-t(-(1/0),1/0),o=0,s=i.length;s>o;o++)e=i[o].style.zIndex,i[o]!==this._container&&e&&(n=t(n,+e));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!o.Browser.ielt9&&this._map._fadeAnimated){o.DomUtil.setOpacity(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var s=this._tiles[n];if(s.current&&s.loaded){var r=Math.min(1,(t-s.loaded)/200);o.DomUtil.setOpacity(s.el,r),1>r?e=!0:(s.active&&(i=!0),s.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this))}},_initContainer:function(){this._container||(this._container=o.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;for(var i in this._levels)this._levels[i].el.children.length||i===t?this._levels[i].el.style.zIndex=e-Math.abs(t-i):(o.DomUtil.remove(this._levels[i].el),delete this._levels[i]);var n=this._levels[t],s=this._map;return n||(n=this._levels[t]={},n.el=o.DomUtil.create("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=s.project(s.unproject(s.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,s.getCenter(),s.getZoom()),o.Util.falseFn(n.el.offsetWidth)),this._level=n,n},_pruneTiles:function(){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom)return this._removeAllTiles();for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_resetAll:function(){for(var t in this._levels)o.DomUtil.remove(this._levels[t].el),delete this._levels[t];this._removeAllTiles(),this._tileZoom=null,this._resetView()},_retainParent:function(t,e,i,n){var o=Math.floor(t/2),s=Math.floor(e/2),r=i-1,a=o+":"+s+":"+r,h=this._tiles[a];return h&&h.active?(h.retain=!0,!0):(h&&h.loaded&&(h.retain=!0),r>n?this._retainParent(o,s,r,n):!1)},_retainChildren:function(t,e,i,n){for(var o=2*t;2*t+2>o;o++)for(var s=2*e;2*e+2>s;s++){var r=o+":"+s+":"+(i+1),a=this._tiles[r];a&&a.active?a.retain=!0:(a&&a.loaded&&(a.retain=!0),n>i+1&&this._retainChildren(o,s,i+1,n))}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_setView:function(t,e,n,o){var s=Math.round(e);(this.options.maxZoom!==i&&s>this.options.maxZoom||this.options.minZoom!==i&&s<this.options.minZoom)&&(s=i);var r=s!==this._tileZoom;(!o||r)&&(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),s!==i&&this._update(t),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();o.Browser.any3d?o.DomUtil.setTransform(t.el,s,n):o.DomUtil.setPosition(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._resetView()},_getTiledPixelBounds:function(t,e,i){var n=this._map,s=n.getZoomScale(e,i),r=n.project(t,i).floor(),a=n.getSize().divideBy(2*s);return new o.Bounds(r.subtract(a),r.add(a))},_update:function(t){var n=this._map;if(n){var s=n.getZoom();if(t===i&&(t=n.getCenter()),this._tileZoom!==i){var r=this._getTiledPixelBounds(t,s,this._tileZoom),a=this._pxBoundsToTileRange(r),h=a.getCenter(),l=[];for(var u in this._tiles)this._tiles[u].current=!1;if(Math.abs(s-this._tileZoom)>1)return void this._setView(t,s);for(var c=a.min.y;c<=a.max.y;c++)for(var d=a.min.x;d<=a.max.x;d++){var _=new o.Point(d,c);if(_.z=this._tileZoom,this._isValidTile(_)){var m=this._tiles[this._tileCoordsToKey(_)];m?m.current=!0:l.push(_)}}if(l.sort(function(t,e){return t.distanceTo(h)-e.distanceTo(h)}),0!==l.length){this._loading||(this._loading=!0,this.fire("loading"));var p=e.createDocumentFragment();for(d=0;d<l.length;d++)this._addTile(l[d],p);this._level.el.appendChild(p)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return o.latLngBounds(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToBounds:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),r=e.wrapLatLng(e.unproject(n,t.z)),a=e.wrapLatLng(e.unproject(s,t.z));return new o.LatLngBounds(r,a)},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new o.Point(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(o.DomUtil.remove(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){o.DomUtil.addClass(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity<1&&o.DomUtil.setOpacity(t,this.options.opacity),o.Browser.android&&!o.Browser.android23&&(t.style.WebkitBackfaceVisibility="hidden")},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),o.bind(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&o.Util.requestAnimFrame(o.bind(this._tileReady,this,t,null,s)),o.DomUtil.setPosition(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,e,i){if(this._map){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(o.DomUtil.setOpacity(i.el,0),o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),o.DomUtil.addClass(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t}),this._noTilesToLoad()&&(this._loading=!1,this.fire("load")))}},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new o.Point(this._wrapX?o.Util.wrapNum(t.x,this._wrapX):t.x,this._wrapY?o.Util.wrapNum(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new o.Bounds(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}}),o.gridLayer=function(t){return new o.GridLayer(t)},o.TileLayer=o.GridLayer.extend({options:{maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,maxNativeZoom:null,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(t,e){this._url=t,e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomOffset++,e.minZoom=Math.max(0,e.minZoom),e.maxZoom--),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),o.Browser.android||this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},createTile:function(t,i){var n=e.createElement("img");return o.DomEvent.on(n,"load",o.bind(this._tileOnLoad,this,i,n)),o.DomEvent.on(n,"error",o.bind(this._tileOnError,this,i,n)),this.options.crossOrigin&&(n.crossOrigin=""),n.alt="",n.src=this.getTileUrl(t),n},getTileUrl:function(t){return o.Util.template(this._url,o.extend({r:this.options.detectRetina&&o.Browser.retina&&this.options.maxZoom>0?"@2x":"",s:this._getSubdomain(t),x:t.x,y:this.options.tms?this._globalTileRange.max.y-t.y:t.y,z:this._getZoomForUrl()},this.options))},_tileOnLoad:function(t,e){o.Browser.ielt9?setTimeout(o.bind(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&(e.src=n),t(i,e)},getTileSize:function(){var t=this._map,e=o.GridLayer.prototype.getTileSize.call(this),i=this._tileZoom+this.options.zoomOffset,n=this.options.maxNativeZoom;return null!==n&&i>n?e.divideBy(t.getZoomScale(n,i)).round():e},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this.options,e=this._tileZoom;return t.zoomReverse&&(e=t.maxZoom-e),e+=t.zoomOffset,null!==t.maxNativeZoom?Math.min(e,t.maxNativeZoom):e},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=o.Util.falseFn,e.onerror=o.Util.falseFn,e.complete||(e.src=o.Util.emptyImageUrl,o.DomUtil.remove(e)))}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e)},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=o.setOptions(this,e),i.width=i.height=e.tileSize*(e.detectRetina&&o.Browser.retina?2:1),this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,o.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToBounds(t),i=this._crs.project(e.getNorthWest()),n=this._crs.project(e.getSouthEast()),s=(this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[n.y,i.x,i.y,n.x]:[i.x,n.y,n.x,i.y]).join(","),r=o.TileLayer.prototype.getTileUrl.call(this,t);return r+o.Util.getParamString(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+s},setParams:function(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e)},o.ImageOverlay=o.Layer.extend({options:{opacity:1,alt:"",interactive:!1},initialize:function(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(o.DomUtil.addClass(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){o.DomUtil.remove(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&o.DomUtil.toFront(this._image),this},bringToBack:function(){return this._map&&o.DomUtil.toBack(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=t,this._map&&this._reset(),this},getAttribution:function(){return this.options.attribution},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._image=o.DomUtil.create("img","leaflet-image-layer "+(this._zoomAnimated?"leaflet-zoom-animated":""));t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,t.onload=o.bind(this.fire,this,"load"),this.options.crossOrigin&&(t.crossOrigin=""),t.src=this._url,t.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(),t.zoom,t.center);o.DomUtil.setTransform(this._image,i,e)},_reset:function(){var t=this._image,e=new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();o.DomUtil.setPosition(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){o.DomUtil.setOpacity(this._image,this.options.opacity)}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i)},o.Icon=o.Class.extend({initialize:function(t){o.setOptions(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&"IMG"===e.tagName?e:null);return this._setIconStyles(n,t),n},_setIconStyles:function(t,e){var i=this.options,n=o.point(i[e+"Size"]),s=o.point("shadow"===e&&i.shadowAnchor||i.iconAnchor||n&&n.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),n&&(t.style.width=n.x+"px",t.style.height=n.y+"px")},_createImg:function(t,i){return i=i||e.createElement("img"),i.src=t,i},_getIconUrl:function(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}}),o.icon=function(t){return new o.Icon(t)},o.Icon.Default=o.Icon.extend({options:{iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]},_getIconUrl:function(t){var e=t+"Url";if(this.options[e])return this.options[e];var i=o.Icon.Default.imagePath;if(!i)throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return i+"/marker-"+t+(o.Browser.retina&&"icon"===t?"-2x":"")+".png"}}),o.Icon.Default.imagePath=function(){var t,i,n,o,s=e.getElementsByTagName("script"),r=/[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,i=s.length;i>t;t++)if(n=s[t].src||"",n.match(r))return o=n.split(r)[0],(o?o+"/":"")+"images"}(),o.Marker=o.Layer.extend({options:{pane:"markerPane",nonBubblingEvents:["click","dblclick","mouseover","mouseout","contextmenu"],icon:new o.Icon.Default,interactive:!0,keyboard:!0,zIndexOffset:0,opacity:1,riseOffset:250},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._initIcon(),this.update()},onRemove:function(){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),this._removeIcon(),this._removeShadow()},getEvents:function(){var t={zoom:this.update,viewreset:this.update};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=o.latLng(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),t.alt&&(i.alt=t.alt)),o.DomUtil.addClass(i,e),t.keyboard&&(i.tabIndex="0"),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var s=t.icon.createShadow(this._shadow),r=!1;s!==this._shadow&&(this._removeShadow(),r=!0),s&&o.DomUtil.addClass(s,e),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&(this.getPane().appendChild(this._icon),this._initInteraction()),s&&r&&this.getPane("shadowPane").appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),o.DomUtil.remove(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&o.DomUtil.remove(this._shadow),this._shadow=null},_setPos:function(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(o.DomUtil.addClass(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),o.Handler.MarkerDrag)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new o.Handler.MarkerDrag(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;o.DomUtil.setOpacity(this._icon,t),this._shadow&&o.DomUtil.setOpacity(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),o.marker=function(t,e){return new o.Marker(t,e)},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],className:"leaflet-div-icon",html:!1},createIcon:function(t){var i=t&&"DIV"===t.tagName?t:e.createElement("div"),n=this.options;return i.innerHTML=n.html!==!1?n.html:"",n.bgPos&&(i.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),this._setIconStyles(i,"icon"),i},createShadow:function(){return null}}),o.divIcon=function(t){return new o.DivIcon(t)},o.Map.mergeOptions({closePopupOnClick:!0}),o.Popup=o.Layer.extend({options:{pane:"popupPane",minWidth:50,maxWidth:300,offset:[0,7],autoPan:!0,autoPanPadding:[5,5],closeButton:!0,autoClose:!0,zoomAnimation:!0},initialize:function(t,e){o.setOptions(this,t),this._source=e},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&this.options.zoomAnimation,this._container||this._initLayout(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,1),t.fire("popupopen",{popup:this}),this._source&&this._source.fire("popupopen",{popup:this},!0)},openOn:function(t){return t.openPopup(this),this},onRemove:function(t){t._fadeAnimated?(o.DomUtil.setOpacity(this._container,0),this._removeTimeout=setTimeout(o.bind(o.DomUtil.remove,o.DomUtil,this._container),200)):o.DomUtil.remove(this._container),t.fire("popupclose",{popup:this}),this._source&&this._source.fire("popupclose",{popup:this},!0)},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&o.DomUtil.toFront(this._container),this},bringToBack:function(){return this._map&&o.DomUtil.toBack(this._container),this},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t="leaflet-popup",e=this._container=o.DomUtil.create("div",t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"));if(this.options.closeButton){var i=this._closeButton=o.DomUtil.create("a",t+"-close-button",e);i.href="#close",i.innerHTML="&#215;",o.DomEvent.on(i,"click",this._onCloseButtonClick,this)}var n=this._wrapper=o.DomUtil.create("div",t+"-content-wrapper",e);this._contentNode=o.DomUtil.create("div",t+"-content",n),o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n,"contextmenu",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",t+"-tip-container",e),this._tip=o.DomUtil.create("div",t+"-tip",this._tipContainer)},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,r="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,r)):o.DomUtil.removeClass(t,r),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=o.point(this.options.offset);this._zoomAnimated?o.DomUtil.setPosition(this._container,t):e=e.add(t);var i=this._containerBottom=-e.y,n=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=i+"px",this._container.style.left=n+"px"}},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);o.DomUtil.setPosition(this._container,e)},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var t=this._map,e=this._container.offsetHeight,i=this._containerWidth,n=new o.Point(this._containerLeft,-e-this._containerBottom);this._zoomAnimated&&n._add(o.DomUtil.getPosition(this._container));var s=t.layerPointToContainerPoint(n),r=o.point(this.options.autoPanPadding),a=o.point(this.options.autoPanPaddingTopLeft||r),h=o.point(this.options.autoPanPaddingBottomRight||r),l=t.getSize(),u=0,c=0;s.x+i+h.x>l.x&&(u=s.x+i-l.x+h.x),s.x-u-a.x<0&&(u=s.x-a.x),s.y+e+h.y>l.y&&(c=s.y+e-l.y+h.y),s.y-c-a.y<0&&(c=s.y-a.y),(u||c)&&t.fire("autopanstart").panBy([u,c])}},_onCloseButtonClick:function(t){this._close(),o.DomEvent.stop(t)}}),o.popup=function(t,e){return new o.Popup(t,e)},o.Map.include({openPopup:function(t,e,i){return t instanceof o.Popup||(t=new o.Popup(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t))},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),o.Layer.include({bindPopup:function(t,e){return t instanceof o.Popup?(o.setOptions(t,e),this._popup=t,t._source=this):((!this._popup||e)&&(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this._originalPopupOffset=this._popup.options.offset,this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._popup&&this._map&&(this._popup.options.offset=this._popupAnchor(t),this._popup._source=t,this._popup.update(),this._map.openPopup(this._popup,e)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this},isPopupOpen:function(){return this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var e=t.layer||t.target;if(this._popup&&this._map)return e instanceof o.Path?void this.openPopup(t.layer||t.target,t.latlng):void(this._map.hasLayer(this._popup)&&this._popup._source===e?this.closePopup():this.openPopup(e,t.latlng))},_popupAnchor:function(t){var e=t._getPopupAnchor?t._getPopupAnchor():[0,0],i=this._originalPopupOffset||o.Popup.prototype.options.offset;return o.point(e).add(i)},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),o.Marker.include({_getPopupAnchor:function(){return this.options.icon.options.popupAnchor||[0,0]}}),o.LayerGroup=o.Layer.extend({initialize:function(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;i>e;e++)this.addLayer(t[e])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),
delete this._layers[e],this},hasLayer:function(t){return!!t&&(t in this._layers||this.getLayerId(t)in this._layers)},clearLayers:function(){for(var t in this._layers)this.removeLayer(this._layers[t]);return this},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)i=this._layers[e],i[t]&&i[t].apply(i,n);return this},onAdd:function(t){for(var e in this._layers)t.addLayer(this._layers[e])},onRemove:function(t){for(var e in this._layers)t.removeLayer(this._layers[e])},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];for(var e in this._layers)t.push(this._layers[e]);return t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return o.stamp(t)}}),o.layerGroup=function(t){return new o.LayerGroup(t)},o.FeatureGroup=o.LayerGroup.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),o.LayerGroup.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),o.LayerGroup.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new o.LatLngBounds;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),o.featureGroup=function(t){return new o.FeatureGroup(t)},o.Renderer=o.Layer.extend({options:{padding:.1},initialize:function(t){o.setOptions(this,t),o.stamp(this)},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&o.DomUtil.addClass(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update()},onRemove:function(){o.DomUtil.remove(this._container)},getEvents:function(){var t={viewreset:this._reset,zoomstart:this._onZoomStart,zoom:this._onZoom,moveend:this._update};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_onZoomStart:function(){this._update()},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=o.DomUtil.getPosition(this._container),s=this._map.getSize().multiplyBy(.5+this.options.padding),r=this._map.project(this._center,e),a=this._map.project(t,e),h=a.subtract(r),l=s.multiplyBy(-i).add(n).add(s).subtract(h);o.DomUtil.setTransform(this._container,l,i)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom)},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new o.Bounds(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),o.Map.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this.options.preferCanvas&&o.canvas()||o.svg()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if("overlayPane"===t||t===i)return!1;var e=this._paneRenderers[t];return e===i&&(e=o.SVG&&o.svg({pane:t})||o.Canvas&&o.canvas({pane:t}),this._paneRenderers[t]=e),e}}),o.Path=o.Layer.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",fillOpacity:.2,fillRule:"evenodd",interactive:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},getEvents:function(){return{zoomend:this._project,moveend:this._update,viewreset:this._reset}},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return o.setOptions(this,t),this._renderer&&this._renderer._updateStyle(this),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(o.Browser.touch?10:0)}}),o.LineUtil={simplify:function(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i)},pointToSegmentDistance:function(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0))},closestPointOnSegment:function(t,e,i){return this._sqClosestPointOnSegment(t,e,i)},_simplifyDP:function(t,e){var n=t.length,o=typeof Uint8Array!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var r,a=[];for(r=0;n>r;r++)s[r]&&a.push(t[r]);return a},_simplifyDPStep:function(t,e,i,n,o){var s,r,a,h=0;for(r=n+1;o-1>=r;r++)a=this._sqClosestPointOnSegment(t[r],t[n],t[o],!0),a>h&&(s=r,h=a);h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o))},_reducePoints:function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;s>n;n++)this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);return s-1>o&&i.push(t[s-1]),i},clipSegment:function(t,e,i,n,o){var s,r,a,h=n?this._lastCode:this._getBitCode(t,i),l=this._getBitCode(e,i);for(this._lastCode=l;;){if(!(h|l))return[t,e];if(h&l)return!1;s=h||l,r=this._getEdgeIntersection(t,e,s,i,o),a=this._getBitCode(r,i),s===h?(t=r,h=a):(e=r,l=a)}},_getEdgeIntersection:function(t,e,i,n,s){var r,a,h=e.x-t.x,l=e.y-t.y,u=n.min,c=n.max;return 8&i?(r=t.x+h*(c.y-t.y)/l,a=c.y):4&i?(r=t.x+h*(u.y-t.y)/l,a=u.y):2&i?(r=c.x,a=t.y+l*(c.x-t.x)/h):1&i&&(r=u.x,a=t.y+l*(u.x-t.x)/h),new o.Point(r,a,s)},_getBitCode:function(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},_sqClosestPointOnSegment:function(t,e,i,n){var s,r=e.x,a=e.y,h=i.x-r,l=i.y-a,u=h*h+l*l;return u>0&&(s=((t.x-r)*h+(t.y-a)*l)/u,s>1?(r=i.x,a=i.y):s>0&&(r+=h*s,a+=l*s)),h=t.x-r,l=t.y-a,n?h*h+l*l:new o.Point(r,a)}},o.Polyline=o.Path.extend({options:{smoothFactor:1},initialize:function(t,e){o.setOptions(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e,i,n=1/0,s=null,r=o.LineUtil._sqClosestPointOnSegment,a=0,h=this._parts.length;h>a;a++)for(var l=this._parts[a],u=1,c=l.length;c>u;u++){e=l[u-1],i=l[u];var d=r(t,e,i,!0);n>d&&(n=d,s=r(t,e,i))}return s&&(s.distance=Math.sqrt(n)),s},getCenter:function(){var t,e,i,n,o,s,r,a=this._rings[0],h=a.length;if(!h)return null;for(t=0,e=0;h-1>t;t++)e+=a[t].distanceTo(a[t+1])/2;if(0===e)return this._map.layerPointToLatLng(a[0]);for(t=0,n=0;h-1>t;t++)if(o=a[t],s=a[t+1],i=o.distanceTo(s),n+=i,n>e)return r=(n-e)/i,this._map.layerPointToLatLng([s.x-r*(s.x-o.x),s.y-r*(s.y-o.y)])},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=o.latLng(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new o.LatLngBounds,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return o.Polyline._flat(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=o.Polyline._flat(t),n=0,s=t.length;s>n;n++)i?(e[n]=o.latLng(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){this._rings=[],this._projectLatlngs(this._latlngs,this._rings);var t=this._clickTolerance(),e=new o.Point(t,-t);this._bounds.isValid()&&(this._pxBounds=new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getSouthWest())._subtract(e),this._map.latLngToLayerPoint(this._bounds.getNorthEast())._add(e)))},_projectLatlngs:function(t,e){var i,n,s=t[0]instanceof o.LatLng,r=t.length;if(s){for(n=[],i=0;r>i;i++)n[i]=this._map.latLngToLayerPoint(t[i]);e.push(n)}else for(i=0;r>i;i++)this._projectLatlngs(t[i],e)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);var e,i,n,s,r,a,h,l=this._parts;for(e=0,n=0,s=this._rings.length;s>e;e++)for(h=this._rings[e],i=0,r=h.length;r-1>i;i++)a=o.LineUtil.clipSegment(h[i],h[i+1],t,i,!0),a&&(l[n]=l[n]||[],l[n].push(a[0]),(a[1]!==h[i+1]||i===r-2)&&(l[n].push(a[1]),n++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;n>i;i++)t[i]=o.LineUtil.simplify(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)}}),o.polyline=function(t,e){return new o.Polyline(t,e)},o.Polyline._flat=function(t){return!o.Util.isArray(t[0])||"object"!=typeof t[0][0]&&"undefined"!=typeof t[0][0]},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e,i){var n,s,r,a,h,l,u,c,d,_=[1,4,2,8],m=o.LineUtil;for(s=0,u=t.length;u>s;s++)t[s]._code=m._getBitCode(t[s],e);for(a=0;4>a;a++){for(c=_[a],n=[],s=0,u=t.length,r=u-1;u>s;r=s++)h=t[s],l=t[r],h._code&c?l._code&c||(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)):(l._code&c&&(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)),n.push(h));t=n}return t},o.Polygon=o.Polyline.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){var t,e,i,n,o,s,r,a,h,l=this._rings[0],u=l.length;if(!u)return null;for(s=r=a=0,t=0,e=u-1;u>t;e=t++)i=l[t],n=l[e],o=i.y*n.x-n.y*i.x,r+=(i.x+n.x)*o,a+=(i.y+n.y)*o,s+=3*o;return h=0===s?l[0]:[r/s,a/s],this._map.layerPointToLatLng(h)},_convertLatLngs:function(t){var e=o.Polyline.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof o.LatLng&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){o.Polyline.prototype._setLatLngs.call(this,t),o.Polyline._flat(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return o.Polyline._flat(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new o.Point(e,e);if(t=new o.Bounds(t.min.subtract(i),t.max.add(i)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);for(var n,s=0,r=this._rings.length;r>s;s++)n=o.PolyUtil.clipPolygon(this._rings[s],t,!0),n.length&&this._parts.push(n)}},_updatePath:function(){this._renderer._updatePoly(this,!0)}}),o.polygon=function(t,e){return new o.Polygon(t,e)},o.Rectangle=o.Polygon.extend({initialize:function(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),o.rectangle=function(t,e){return new o.Rectangle(t,e)},o.CircleMarker=o.Path.extend({options:{fill:!0,radius:10},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t),this._radius=this.options.radius},setLatLng:function(t){return this._latlng=o.latLng(t),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return o.Path.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new o.Bounds(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e)},o.Circle=o.CircleMarker.extend({initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t),this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:o.Path.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===o.CRS.Earth.distance){var s=Math.PI/180,r=this._mRadius/o.CRS.Earth.R/s,a=i.project([e+r,t]),h=i.project([e-r,t]),l=a.add(h).divideBy(2),u=i.unproject(l).lat,c=Math.acos((Math.cos(r*s)-Math.sin(e*s)*Math.sin(u*s))/(Math.cos(e*s)*Math.cos(u*s)))/s;this._point=l.subtract(i.getPixelOrigin()),this._radius=isNaN(c)?0:Math.max(Math.round(l.x-i.project([u,t-c]).x),1),this._radiusY=Math.max(Math.round(l.y-a.y),1)}else{var d=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(d).x}this._updateBounds()}}),o.circle=function(t,e,i){return"number"==typeof e&&(e=o.extend({},i,{radius:e})),new o.Circle(t,e)},o.SVG=o.Renderer.extend({_initContainer:function(){this._container=o.SVG.create("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=o.SVG.create("g"),this._container.appendChild(this._rootGroup)},_update:function(){if(!this._map._animatingZoom||!this._bounds){o.Renderer.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),o.DomUtil.setPosition(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" "))}},_initPath:function(t){var e=t._path=o.SVG.create("path");t.options.className&&o.DomUtil.addClass(e,t.options.className),t.options.interactive&&o.DomUtil.addClass(e,"leaflet-interactive"),this._updateStyle(t)},_addPath:function(t){this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){o.DomUtil.remove(t._path),t.removeInteractiveTarget(t._path)},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"),e.setAttribute("pointer-events",i.pointerEvents||(i.interactive?"visiblePainted":"none")))},_updatePoly:function(t,e){this._setPath(t,o.SVG.pointsToPath(t._parts,e))},_updateCircle:function(t){var e=t._point,i=t._radius,n=t._radiusY||i,o="a"+i+","+n+" 0 1,0 ",s=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+o+2*i+",0 "+o+2*-i+",0 ";this._setPath(t,s)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){o.DomUtil.toFront(t._path)},_bringToBack:function(t){o.DomUtil.toBack(t._path)}}),o.extend(o.SVG,{create:function(t){return e.createElementNS("http://www.w3.org/2000/svg",t)},pointsToPath:function(t,e){var i,n,s,r,a,h,l="";for(i=0,s=t.length;s>i;i++){for(a=t[i],n=0,r=a.length;r>n;n++)h=a[n],l+=(n?"L":"M")+h.x+" "+h.y;l+=e?o.Browser.svg?"z":"x":""}return l||"M0 0"}}),o.Browser.svg=!(!e.createElementNS||!o.SVG.create("svg").createSVGRect),o.svg=function(t){return o.Browser.svg||o.Browser.vml?new o.SVG(t):null},o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(n){return!1}}(),o.SVG.include(o.Browser.vml?{_initContainer:function(){this._container=o.DomUtil.create("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||o.Renderer.prototype._update.call(this)},_initPath:function(t){var e=t._container=o.SVG.create("shape");o.DomUtil.addClass(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=o.SVG.create("path"),e.appendChild(t._path),this._updateStyle(t)},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;o.DomUtil.remove(e),t.removeInteractiveTarget(e)},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container;s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=o.SVG.create("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=o.Util.isArray(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=o.SVG.create("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){o.DomUtil.toFront(t._container)},_bringToBack:function(t){o.DomUtil.toBack(t._container)}}:{}),o.Browser.vml&&(o.SVG.create=function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}()),o.Canvas=o.Renderer.extend({onAdd:function(){o.Renderer.prototype.onAdd.call(this),this._layers=this._layers||{},this._draw()},_initContainer:function(){var t=this._container=e.createElement("canvas");o.DomEvent.on(t,"mousemove",o.Util.throttle(this._onMouseMove,32,this),this).on(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this).on(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d")},_update:function(){if(!this._map._animatingZoom||!this._bounds){this._drawnLayers={},o.Renderer.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=o.Browser.retina?2:1;o.DomUtil.setPosition(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",o.Browser.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y)}},_initPath:function(t){this._layers[o.stamp(t)]=t},_addPath:o.Util.falseFn,_removePath:function(t){t._removed=!0,this._requestRedraw(t)},_updatePath:function(t){this._redrawBounds=t._pxBounds,this._draw(!0),t._project(),t._update(),this._draw(),this._redrawBounds=null},_updateStyle:function(t){this._requestRedraw(t)},_requestRedraw:function(t){if(this._map){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new o.Bounds,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e])),this._redrawRequest=this._redrawRequest||o.Util.requestAnimFrame(this._redraw,this)}},_redraw:function(){this._redrawRequest=null,this._draw(!0),this._draw(),this._redrawBounds=null},_draw:function(t){this._clear=t;var e,i=this._redrawBounds;this._ctx.save(),i&&(this._ctx.beginPath(),this._ctx.rect(i.min.x,i.min.y,i.max.x-i.min.x,i.max.y-i.min.y),this._ctx.clip());for(var n in this._layers)e=this._layers[n],(!i||e._pxBounds.intersects(i))&&e._updatePath(),t&&e._removed&&(delete e._removed,delete this._layers[n]);this._ctx.restore()},_updatePoly:function(t,e){var i,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(this._drawnLayers[t._leaflet_id]=t,h.beginPath(),i=0;a>i;i++){for(n=0,o=r[i].length;o>n;n++)s=r[i][n],h[n?"lineTo":"moveTo"](s.x,s.y);e&&h.closePath()}this._fillStroke(h,t)}},_updateCircle:function(t){if(!t._empty()){var e=t._point,i=this._ctx,n=t._radius,o=(t._radiusY||n)/n;1!==o&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,2*Math.PI,!1),1!==o&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=this._clear,n=e.options;t.globalCompositeOperation=i?"destination-out":"source-over",n.fill&&(t.globalAlpha=i?1:n.fillOpacity,t.fillStyle=n.fillColor||n.color,t.fill(n.fillRule||"evenodd")),n.stroke&&0!==n.weight&&(t.globalAlpha=i?1:n.opacity,e._prevWeight=t.lineWidth=i?e._prevWeight+1:n.weight,t.strokeStyle=n.color,t.lineCap=n.lineCap,t.lineJoin=n.lineJoin,t.stroke())},_onClick:function(t){var e=this._map.mouseEventToLayerPoint(t),i=[];for(var n in this._layers)this._layers[n]._containsPoint(e)&&(o.DomEvent._fakeStop(t),i.push(this._layers[n]));i.length&&this._fireEvent(i,t)},_onMouseMove:function(t){if(this._map&&!this._map.dragging._draggable._moving&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseOut(t,e),this._handleMouseHover(t,e)}},_handleMouseOut:function(t,e){var i=this._hoveredLayer;!i||"mouseout"!==t.type&&i._containsPoint(e)||(o.DomUtil.removeClass(this._container,"leaflet-interactive"),this._fireEvent([i],t,"mouseout"),this._hoveredLayer=null)},_handleMouseHover:function(t,e){var i,n;if(!this._hoveredLayer)for(i in this._drawnLayers)if(n=this._drawnLayers[i],n.options.interactive&&n._containsPoint(e)){o.DomUtil.addClass(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n;break}this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t)},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:o.Util.falseFn,_bringToBack:o.Util.falseFn}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext}(),o.canvas=function(t){return o.Browser.canvas?new o.Canvas(t):null},o.Polyline.prototype._containsPoint=function(t,e){var i,n,s,r,a,h,l=this._clickTolerance();if(!this._pxBounds.contains(t))return!1;for(i=0,r=this._parts.length;r>i;i++)for(h=this._parts[i],n=0,a=h.length,s=a-1;a>n;s=n++)if((e||0!==n)&&o.LineUtil.pointToSegmentDistance(t,h[s],h[n])<=l)return!0;return!1},o.Polygon.prototype._containsPoint=function(t){var e,i,n,s,r,a,h,l,u=!1;if(!this._pxBounds.contains(t))return!1;for(s=0,h=this._parts.length;h>s;s++)for(e=this._parts[s],r=0,l=e.length,a=l-1;l>r;a=r++)i=e[r],n=e[a],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);return u||o.Polyline.prototype._containsPoint.call(this,t,!0)},o.CircleMarker.prototype._containsPoint=function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()},o.GeoJSON=o.FeatureGroup.extend({initialize:function(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,s=o.Util.isArray(t)?t:t.features;if(s){for(e=0,i=s.length;i>e;e++)n=s[e],(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var r=this.options;if(r.filter&&!r.filter(t))return this;var a=o.GeoJSON.geometryToLayer(t,r);return a?(a.feature=o.GeoJSON.asFeature(t),a.defaultOptions=a.options,this.resetStyle(a),r.onEachFeature&&r.onEachFeature(t,a),this.addLayer(a)):this},resetStyle:function(t){return t.options=t.defaultOptions,this._setLayerStyle(t,this.options.style),this},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}}),o.extend(o.GeoJSON,{geometryToLayer:function(t,e){var i,n,s,r,a="Feature"===t.type?t.geometry:t,h=a?a.coordinates:null,l=[],u=e&&e.pointToLayer,c=e&&e.coordsToLatLng||this.coordsToLatLng;if(!h&&!a)return null;switch(a.type){case"Point":return i=c(h),u?u(t,i):new o.Marker(i);case"MultiPoint":for(s=0,r=h.length;r>s;s++)i=c(h[s]),l.push(u?u(t,i):new o.Marker(i));return new o.FeatureGroup(l);case"LineString":case"MultiLineString":return n=this.coordsToLatLngs(h,"LineString"===a.type?0:1,c),new o.Polyline(n,e);case"Polygon":case"MultiPolygon":return n=this.coordsToLatLngs(h,"Polygon"===a.type?1:2,c),new o.Polygon(n,e);case"GeometryCollection":for(s=0,r=a.geometries.length;r>s;s++){var d=this.geometryToLayer({geometry:a.geometries[s],type:"Feature",properties:t.properties},e);d&&l.push(d)}return new o.FeatureGroup(l);default:throw new Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t){return new o.LatLng(t[1],t[0],t[2])},coordsToLatLngs:function(t,e,i){for(var n,o=[],s=0,r=t.length;r>s;s++)n=e?this.coordsToLatLngs(t[s],e-1,i):(i||this.coordsToLatLng)(t[s]),o.push(n);return o},latLngToCoords:function(t){return t.alt!==i?[t.lng,t.lat,t.alt]:[t.lng,t.lat]},latLngsToCoords:function(t,e,i){for(var n=[],s=0,r=t.length;r>s;s++)n.push(e?o.GeoJSON.latLngsToCoords(t[s],e-1,i):o.GeoJSON.latLngToCoords(t[s]));return!e&&i&&n.push(n[0]),n},getFeature:function(t,e){return t.feature?o.extend({},t.feature,{geometry:e}):o.GeoJSON.asFeature(e)},asFeature:function(t){return"Feature"===t.type?t:{type:"Feature",properties:{},geometry:t}}});var r={toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())})}};o.Marker.include(r),o.Circle.include(r),o.CircleMarker.include(r),o.Polyline.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=o.GeoJSON.latLngsToCoords(this._latlngs,t?1:0);return o.GeoJSON.getFeature(this,{type:(t?"Multi":"")+"LineString",coordinates:e})},o.Polygon.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=t&&!o.Polyline._flat(this._latlngs[0]),i=o.GeoJSON.latLngsToCoords(this._latlngs,e?2:t?1:0,!0);return t||(i=[i]),o.GeoJSON.getFeature(this,{type:(e?"Multi":"")+"Polygon",coordinates:i})},o.LayerGroup.include({toMultiPoint:function(){var t=[];return this.eachLayer(function(e){t.push(e.toGeoJSON().geometry.coordinates)}),o.GeoJSON.getFeature(this,{type:"MultiPoint",coordinates:t})},toGeoJSON:function(){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===t)return this.toMultiPoint();var e="GeometryCollection"===t,i=[];return this.eachLayer(function(t){if(t.toGeoJSON){var n=t.toGeoJSON();i.push(e?n.geometry:o.GeoJSON.asFeature(n))}}),e?o.GeoJSON.getFeature(this,{geometries:i,type:"GeometryCollection"}):{type:"FeatureCollection",features:i}}}),o.geoJson=function(t,e){return new o.GeoJSON(t,e)};var a="_leaflet_events";o.DomEvent={on:function(t,e,i,n){if("object"==typeof e)for(var s in e)this._on(t,s,e[s],i);else{e=o.Util.splitWords(e);for(var r=0,a=e.length;a>r;r++)this._on(t,e[r],i,n)}return this},off:function(t,e,i,n){if("object"==typeof e)for(var s in e)this._off(t,s,e[s],i);else{e=o.Util.splitWords(e);for(var r=0,a=e.length;a>r;r++)this._off(t,e[r],i,n)}return this},_on:function(e,i,n,s){var r=i+o.stamp(n)+(s?"_"+o.stamp(s):"");if(e[a]&&e[a][r])return this;var h=function(i){return n.call(s||e,i||t.event)},l=h;return o.Browser.pointer&&0===i.indexOf("touch")?this.addPointerListener(e,i,h,r):o.Browser.touch&&"dblclick"===i&&this.addDoubleTapListener?this.addDoubleTapListener(e,h,r):"addEventListener"in e?"mousewheel"===i?(e.addEventListener("DOMMouseScroll",h,!1),e.addEventListener(i,h,!1)):"mouseenter"===i||"mouseleave"===i?(h=function(i){i=i||t.event,o.DomEvent._isExternalTarget(e,i)&&l(i)},e.addEventListener("mouseenter"===i?"mouseover":"mouseout",h,!1)):("click"===i&&o.Browser.android&&(h=function(t){return o.DomEvent._filterClick(t,l)}),e.addEventListener(i,h,!1)):"attachEvent"in e&&e.attachEvent("on"+i,h),e[a]=e[a]||{},e[a][r]=h,this},_off:function(t,e,i,n){var s=e+o.stamp(i)+(n?"_"+o.stamp(n):""),r=t[a]&&t[a][s];return r?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,e,s):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,s):"removeEventListener"in t?"mousewheel"===e?(t.removeEventListener("DOMMouseScroll",r,!1),t.removeEventListener(e,r,!1)):t.removeEventListener("mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,r,!1):"detachEvent"in t&&t.detachEvent("on"+e,r),t[a][s]=null,this):this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,o.DomEvent._skipped(t),this},disableScrollPropagation:function(t){return o.DomEvent.on(t,"mousewheel MozMousePixelScroll",o.DomEvent.stopPropagation)},disableClickPropagation:function(t){var e=o.DomEvent.stopPropagation;return o.DomEvent.on(t,o.Draggable.START.join(" "),e),o.DomEvent.on(t,{click:o.DomEvent._fakeStop,dblclick:e})},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return o.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,e){if(!e)return new o.Point(t.clientX,t.clientY);var i=e.getBoundingClientRect();return new o.Point(t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop)},getWheelDelta:function(t){var e=0;return t.wheelDelta&&(e=t.wheelDelta/120),t.detail&&(e=-t.detail/3),e},_skipEvents:{},_fakeStop:function(t){o.DomEvent._skipEvents[t.type]=!0},_skipped:function(t){var e=this._skipEvents[t.type];return this._skipEvents[t.type]=!1,e},_isExternalTarget:function(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(n){return!1}return i!==t},_filterClick:function(t,e){var i=t.timeStamp||t.originalEvent.timeStamp,n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;return n&&n>100&&500>n||t.target._simulatedClick&&!t._simulated?void o.DomEvent.stop(t):(o.DomEvent._lastClick=i,void e(t))}},o.DomEvent.addListener=o.DomEvent.on,o.DomEvent.removeListener=o.DomEvent.off,o.Draggable=o.Evented.extend({statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function(t,e,i){this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(o.DomEvent.on(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(o.DomEvent.off(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._moved=!1,!o.DomUtil.hasClass(this._element,"leaflet-zoom-anim")&&!(o.Draggable._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches)&&this._enabled&&(o.Draggable._dragging=!0,this._preventOutline&&o.DomUtil.preventOutline(this._element),o.DomUtil.disableImageDrag(),o.DomUtil.disableTextSelection(),!this._moving)){this.fire("down");var i=t.touches?t.touches[0]:t;this._startPoint=new o.Point(i.clientX,i.clientY),this._startPos=this._newPos=o.DomUtil.getPosition(this._element),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this)}},_onMove:function(t){if(t.touches&&t.touches.length>1)return void(this._moved=!0);var i=t.touches&&1===t.touches.length?t.touches[0]:t,n=new o.Point(i.clientX,i.clientY),s=n.subtract(this._startPoint);(s.x||s.y)&&(o.Browser.touch&&Math.abs(s.x)+Math.abs(s.y)<3||(o.DomEvent.preventDefault(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(s),o.DomUtil.addClass(e.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,o.DomUtil.addClass(this._lastTarget,"leaflet-drag-target")),
this._newPos=this._startPos.add(s),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._lastEvent=t,this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0)))},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){o.DomUtil.removeClass(e.body,"leaflet-dragging"),this._lastTarget&&(o.DomUtil.removeClass(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null);for(var t in o.Draggable.MOVE)o.DomEvent.off(e,o.Draggable.MOVE[t],this._onMove,this).off(e,o.Draggable.END[t],this._onUp,this);o.DomUtil.enableImageDrag(),o.DomUtil.enableTextSelection(),this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,o.Draggable._dragging=!1}}),o.Handler=o.Class.extend({initialize:function(t){this._map=t},enable:function(){this._enabled||(this._enabled=!0,this.addHooks())},disable:function(){this._enabled&&(this._enabled=!1,this.removeHooks())},enabled:function(){return!!this._enabled}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1}),o.Map.Drag=o.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container),this._draggable.on({down:this._onDown,dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}o.DomUtil.addClass(this._map._container,"leaflet-grab"),this._draggable.enable()},removeHooks:function(){o.DomUtil.removeClass(this._map._container,"leaflet-grab"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDown:function(){this._map.stop()},_onDragStart:function(){var t=this._map;if(this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=o.latLngBounds(this._map.options.maxBounds);this._offsetLimit=o.bounds(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),e-this._times[0]>50&&(this._positions.shift(),this._times.shift())}this._map.fire("move",t).fire("drag",t)},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,r=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{var s=this._lastPos.subtract(this._positions[0]),r=(this._lastTime-this._times[0])/1e3,a=i.easeLinearity,h=s.multiplyBy(a/r),l=h.distanceTo([0,0]),u=Math.min(i.inertiaMaxSpeed,l),c=h.multiplyBy(u/l),d=u/(i.inertiaDeceleration*a),_=c.multiplyBy(-d/2).round();_.x||_.y?(_=e._limitOffset(_,e.options.maxBounds),o.Util.requestAnimFrame(function(){e.panBy(_,{duration:d,easeLinearity:a,noMoveStart:!0,animate:!0})})):e.fire("moveend")}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=t.originalEvent.shiftKey?Math.ceil(i)-1:Math.floor(i)+1;"center"===e.options.doubleClickZoom?e.setZoom(n):e.setZoomAround(t.containerPoint,n)}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,{mousewheel:this._onWheelScroll,MozMousePixelScroll:o.DomEvent.preventDefault},this),this._delta=0},removeHooks:function(){o.DomEvent.off(this._map._container,{mousewheel:this._onWheelScroll,MozMousePixelScroll:o.DomEvent.preventDefault},this)},_onWheelScroll:function(t){var e=o.DomEvent.getWheelDelta(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),n),o.DomEvent.stop(t)},_performZoom:function(){var t=this._map,e=this._delta,i=t.getZoom();t.stop(),e=e>0?Math.ceil(e):Math.floor(e),e=Math.max(Math.min(e,4),-4),e=t._limitZoom(i+e)-i,this._delta=0,this._startTime=null,e&&("center"===t.options.scrollWheelZoom?t.setZoom(i+e):t.setZoomAround(this._lastMousePos,i+e))}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msPointer?"MSPointerDown":o.Browser.pointer?"pointerdown":"touchstart",_touchend:o.Browser.msPointer?"MSPointerUp":o.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function(t,e,i){function n(t){var e;if(e=o.Browser.pointer?o.DomEvent._pointersCount:t.touches.length,!(e>1)){var i=Date.now(),n=i-(r||i);a=t.touches?t.touches[0]:t,h=n>0&&l>=n,r=i}}function s(){if(h&&!a.cancelBubble){if(o.Browser.pointer){var t,i,n={};for(i in a)t=a[i],n[i]=t&&t.bind?t.bind(a):t;a=n}a.type="dblclick",e(a),r=null}}var r,a,h=!1,l=250,u="_leaflet_",c=this._touchstart,d=this._touchend;return t[u+c+i]=n,t[u+d+i]=s,t.addEventListener(c,n,!1),t.addEventListener(d,s,!1),this},removeDoubleTapListener:function(t,e){var i="_leaflet_",n=t[i+this._touchend+e];return t.removeEventListener(this._touchstart,t[i+this._touchstart+e],!1),t.removeEventListener(this._touchend,n,!1),this}}),o.extend(o.DomEvent,{POINTER_DOWN:o.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:o.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:o.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:o.Browser.msPointer?"MSPointerCancel":"pointercancel",_pointers:{},_pointersCount:0,addPointerListener:function(t,e,i,n){return"touchstart"===e?this._addPointerStart(t,i,n):"touchmove"===e?this._addPointerMove(t,i,n):"touchend"===e&&this._addPointerEnd(t,i,n),this},removePointerListener:function(t,e,i){var n=t["_leaflet_"+e+i];return"touchstart"===e?t.removeEventListener(this.POINTER_DOWN,n,!1):"touchmove"===e?t.removeEventListener(this.POINTER_MOVE,n,!1):"touchend"===e&&(t.removeEventListener(this.POINTER_UP,n,!1),t.removeEventListener(this.POINTER_CANCEL,n,!1)),this},_addPointerStart:function(t,i,n){var s=o.bind(function(t){"mouse"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&o.DomEvent.preventDefault(t),this._handlePointer(t,i)},this);if(t["_leaflet_touchstart"+n]=s,t.addEventListener(this.POINTER_DOWN,s,!1),!this._pointerDocListener){var r=o.bind(this._globalPointerUp,this);e.documentElement.addEventListener(this.POINTER_DOWN,o.bind(this._globalPointerDown,this),!0),e.documentElement.addEventListener(this.POINTER_MOVE,o.bind(this._globalPointerMove,this),!0),e.documentElement.addEventListener(this.POINTER_UP,r,!0),e.documentElement.addEventListener(this.POINTER_CANCEL,r,!0),this._pointerDocListener=!0}},_globalPointerDown:function(t){this._pointers[t.pointerId]=t,this._pointersCount++},_globalPointerMove:function(t){this._pointers[t.pointerId]&&(this._pointers[t.pointerId]=t)},_globalPointerUp:function(t){delete this._pointers[t.pointerId],this._pointersCount--},_handlePointer:function(t,e){t.touches=[];for(var i in this._pointers)t.touches.push(this._pointers[i]);t.changedTouches=[t],e(t)},_addPointerMove:function(t,e,i){var n=o.bind(function(t){(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons)&&this._handlePointer(t,e)},this);t["_leaflet_touchmove"+i]=n,t.addEventListener(this.POINTER_MOVE,n,!1)},_addPointerEnd:function(t,e,i){var n=o.bind(function(t){this._handlePointer(t,e)},this);t["_leaflet_touchend"+i]=n,t.addEventListener(this.POINTER_UP,n,!1),t.addEventListener(this.POINTER_CANCEL,n,!1)}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23,bounceAtZoomLimits:!0}),o.Map.TouchZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToContainerPoint(t.touches[0]),s=i.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=i.getSize()._divideBy(2),this._startLatLng=i.containerPointToLatLng(this._centerPoint),"center"!==i.options.touchZoom&&(this._pinchStartLatLng=i.containerPointToLatLng(n.add(s)._divideBy(2))),this._startDist=n.distanceTo(s),this._startZoom=i.getZoom(),this._moved=!1,this._zooming=!0,i.stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===s)return}else{var r=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(1===s&&0===r.x&&0===r.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng).subtract(r))}if(e.options.bounceAtZoomLimits||!(this._zoom<=e.getMinZoom()&&1>s||this._zoom>=e.getMaxZoom()&&s>1)){this._moved||(e._moveStart(!0),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest);var a=o.bind(e._move,e,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=o.Util.requestAnimFrame(a,this,!0),o.DomEvent.preventDefault(t)}}},_onTouchEnd:function(){if(!this._moved||!this._zooming)return void(this._zooming=!1);this._zooming=!1,o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd);var t=this._zoom;t=this._map._limitZoom(t-this._startZoom>0?Math.ceil(t):Math.floor(t)),this._map._animateZoom(this._center,t,!0,!0)}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({tap:!0,tapTolerance:15}),o.Map.Tap=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(o.DomEvent.preventDefault(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],n=i.target;this._startPos=this._newPos=new o.Point(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,"leaflet-active"),this._holdTimeout=setTimeout(o.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),this._simulateEvent("mousedown",i),o.DomEvent.on(e,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),o.DomEvent.off(e,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),this._simulateEvent("mouseup",i),this._isTapValid()&&this._simulateEvent("click",i)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var e=t.touches[0];this._newPos=new o.Point(e.clientX,e.clientY),this._simulateEvent("mousemove",e)},_simulateEvent:function(i,n){var o=e.createEvent("MouseEvents");o._simulated=!0,n.target._simulatedClick=!0,o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o)}}),o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler","tap",o.Map.Tap),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane},addHooks:function(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_resetState:function(){this._moved=!1},_onMouseDown:function(t){return!t.shiftKey||1!==t.which&&1!==t.button?!1:(this._resetState(),o.DomUtil.disableTextSelection(),o.DomUtil.disableImageDrag(),this._startPoint=this._map.mouseEventToContainerPoint(t),void o.DomEvent.on(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this))},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=o.DomUtil.create("div","leaflet-zoom-box",this._container),o.DomUtil.addClass(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new o.Bounds(this._point,this._startPoint),i=e.getSize();o.DomUtil.setPosition(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(o.DomUtil.remove(this._box),o.DomUtil.removeClass(this._container,"leaflet-crosshair")),o.DomUtil.enableTextSelection(),o.DomUtil.enableImageDrag(),o.DomEvent.off(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){setTimeout(o.bind(this._resetState,this),0);var e=new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanOffset(t.options.keyboardPanOffset),this._setZoomOffset(t.options.keyboardZoomOffset)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),o.DomEvent.on(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),o.DomEvent.off(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;i>e;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;i>e;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;i>e;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;i>e;e++)n[o.up[e]]=[0,-1*t]},_setZoomOffset:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;i>e;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;i>e;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){o.DomEvent.on(e,"keydown",this._onKeyDown,this)},_removeHooks:function(){o.DomEvent.off(e,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map;if(i in this._panKeys){if(n._panAnim&&n._panAnim._inProgress)return;e=this._panKeys[i],t.shiftKey&&(e=o.point(e).multiplyBy(3)),n.panBy(e),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds)}else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i]);else{if(27!==i)return;n.closePopup()}o.DomEvent.stop(t)}}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),o.DomUtil.addClass(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&o.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(t){var e=this._marker,i=e._shadow,n=o.DomUtil.getPosition(e._icon),s=e._map.layerPointToLatLng(n);i&&o.DomUtil.setPosition(i,n),e._latlng=s,t.latlng=s,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){this._marker.fire("moveend").fire("dragend",t)}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function(t){o.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),-1!==i.indexOf("bottom")?n.insertBefore(e,n.firstChild):n.appendChild(e),this},remove:function(){return this._map?(o.DomUtil.remove(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),o.control=function(t){return new o.Control(t)},o.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){function t(t,s){var r=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",r,n)}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){o.DomUtil.remove(this._controlContainer)}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){this._disabled||this._map.zoomIn(t.shiftKey?3:1)},_zoomOut:function(t){this._disabled||this._map.zoomOut(t.shiftKey?3:1)},_createButton:function(t,e,i,n,s){var r=o.DomUtil.create("a",i,n);return r.innerHTML=t,r.href="#",r.title=e,o.DomEvent.on(r,"mousedown dblclick",o.DomEvent.stopPropagation).on(r,"click",o.DomEvent.stop).on(r,"click",s,this).on(r,"click",this._refocusOnMap,this),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMinZoom())&&o.DomUtil.addClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMaxZoom())&&o.DomUtil.addClass(this._zoomInButton,e)}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom,this.addControl(this.zoomControl))}),o.control.zoom=function(t){return new o.Control.Zoom(t)},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){o.setOptions(this,t),this._attributions={}},onAdd:function(t){this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent&&o.DomEvent.disableClickPropagation(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),this._container},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new o.Control.Attribution).addTo(this))}),o.control.attribution=function(t){return new o.Control.Attribution(t)},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e,i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=1e3>e?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e,i,n,o=3.2808399*t;o>5280?(e=o/5280,i=this._getRoundNum(e),this._updateScale(this._iScale,i+" mi",i/e)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),o.control.scale=function(t){return new o.Control.Scale(t)},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1},initialize:function(t,e,i){o.setOptions(this,i),this._layers={},this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){return this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this),this._container},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._update()},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._update()},removeLayer:function(t){return t.off("add remove",this._onLayerChange,this),delete this._layers[o.stamp(t)],this._update()},_initLayout:function(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t);e.setAttribute("aria-haspopup",!0),o.DomEvent.disableClickPropagation(e),o.Browser.touch||o.DomEvent.disableScrollPropagation(e);var i=this._form=o.DomUtil.create("form",t+"-list");if(this.options.collapsed){o.Browser.android||o.DomEvent.on(e,{mouseenter:this._expand,mouseleave:this._collapse},this);var n=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);n.href="#",n.title="Layers",o.Browser.touch?o.DomEvent.on(n,"click",o.DomEvent.stop).on(n,"click",this._expand,this):o.DomEvent.on(n,"focus",this._expand,this),o.DomEvent.on(i,"click",function(){setTimeout(o.bind(this._onInputClick,this),0)},this),this._map.on("click",this._collapse,this)}else this._expand();this._baseLayersList=o.DomUtil.create("div",t+"-base",i),this._separator=o.DomUtil.create("div",t+"-separator",i),this._overlaysList=o.DomUtil.create("div",t+"-overlays",i),e.appendChild(i)},_addLayer:function(t,e,i){t.on("add remove",this._onLayerChange,this);var n=o.stamp(t);this._layers[n]={layer:t,name:e,overlay:i},this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(!this._container)return this;o.DomUtil.empty(this._baseLayersList),o.DomUtil.empty(this._overlaysList);var t,e,i,n,s=0;for(i in this._layers)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._layers[o.stamp(t.target)],i=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(i?' checked="checked"':"")+"/>",o=e.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var r=e.createElement("span");r.innerHTML=" "+t.name;var a=e.createElement("div");n.appendChild(a),a.appendChild(i),a.appendChild(r);var h=t.overlay?this._overlaysList:this._baseLayersList;return h.appendChild(n),this._checkDisabledLayers(),n},_onInputClick:function(){var t,e,i,n=this._form.getElementsByTagName("input"),o=[],s=[];this._handlingClick=!0;for(var r=n.length-1;r>=0;r--)t=n[r],e=this._layers[t.layerId].layer,i=this._map.hasLayer(e),t.checked&&!i?o.push(e):!t.checked&&i&&s.push(e);for(r=0;r<s.length;r++)this._map.removeLayer(s[r]);for(r=0;r<o.length;r++)this._map.addLayer(o[r]);this._handlingClick=!1,this._refocusOnMap()},_expand:function(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null;var t=this._map._size.y-(this._container.offsetTop+50);t<this._form.clientHeight?(o.DomUtil.addClass(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=t+"px"):o.DomUtil.removeClass(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers()},_collapse:function(){o.DomUtil.removeClass(this._container,"leaflet-control-layers-expanded")},_checkDisabledLayers:function(){for(var t,e,n=this._form.getElementsByTagName("input"),o=this._map.getZoom(),s=n.length-1;s>=0;s--)t=n[s],e=this._layers[t.layerId].layer,t.disabled=e.options.minZoom!==i&&o<e.options.minZoom||e.options.maxZoom!==i&&o>e.options.maxZoom}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i)},o.PosAnimation=o.Evented.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=1e3*this._duration;i>e?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),o.DomUtil.setPosition(this._el,i),this.fire("step")},_complete:function(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),o.Map.include({setView:function(t,e,n){if(e=e===i?this._zoom:this._limitZoom(e),t=this._limitCenter(o.latLng(t),e,this.options.maxBounds),n=n||{},this.stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate,duration:n.duration},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},panBy:function(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new o.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t);this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._floor();return(e&&e.animate)===!0||this.getSize().contains(i)?(this.panBy(i,e),!0):!1}}),o.Map.mergeOptions({zoomAnimation:!0,zoomAnimationThreshold:4});var h=o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.mobileOpera;h&&o.Map.addInitHook(function(){this._zoomAnimated=this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),o.DomEvent.on(this._proxy,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this))}),o.Map.include(h?{_createAnimProxy:function(){var t=this._proxy=o.DomUtil.create("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=o.DomUtil.TRANSFORM,n=t.style[i];o.DomUtil.setTransform(t,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===t.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",function(){var e=this.getCenter(),i=this.getZoom();
o.DomUtil.setTransform(t,this.project(e,i),this.getZoomScale(i,1))},this)},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n);return i.animate===!0||this.getSize().contains(s)?(o.Util.requestAnimFrame(function(){this._moveStart(!0)._animateZoom(t,e,!0)},this),!0):!1},_animateZoom:function(t,e,i,n){i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),setTimeout(o.bind(this._onZoomTransitionEnd,this),250)},_onZoomTransitionEnd:function(){this._animatingZoom&&(o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),o.Util.requestAnimFrame(function(){this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom)._moveEnd(!0)},this))}}:{}),o.Map.include({flyTo:function(t,e,n){function s(t){var e=(v*v-g*g+(t?-1:1)*L*L*y*y)/(2*(t?v:g)*L*y);return Math.log(Math.sqrt(e*e+1)-e)}function r(t){return(Math.exp(t)-Math.exp(-t))/2}function a(t){return(Math.exp(t)+Math.exp(-t))/2}function h(t){return r(t)/a(t)}function l(t){return g*(a(x)/a(x+P*t))}function u(t){return g*(a(x)*h(x+P*t)-r(x))/L}function c(t){return 1-Math.pow(1-t,1.5)}function d(){var i=(Date.now()-b)/D,n=c(i)*w;1>=i?(this._flyToFrame=o.Util.requestAnimFrame(d,this),this._move(this.unproject(_.add(m.subtract(_).multiplyBy(u(n)/y)),f),this.getScaleZoom(g/l(n),f),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}if(n=n||{},n.animate===!1||!o.Browser.any3d)return this.setView(t,e,n);this.stop();var _=this.project(this.getCenter()),m=this.project(t),p=this.getSize(),f=this._zoom;t=o.latLng(t),e=e===i?f:e;var g=Math.max(p.x,p.y),v=g*this.getZoomScale(f,e),y=m.distanceTo(_)||1,P=1.42,L=P*P,x=s(0),b=Date.now(),w=(s(1)-x)/P,D=n.duration?1e3*n.duration:1e3*w*.8;return this._moveStart(!0),d.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)}}),o.Map.include({_defaultLocateOptions:{timeout:1e4,watch:!1},locate:function(t){if(t=this._locateOptions=o.extend({},this._defaultLocateOptions,t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=n.toBounds(t.coords.accuracy),r=this._locateOptions;if(r.setView){var a=this.getBoundsZoom(s);this.setView(n,r.maxZoom?Math.min(a,r.maxZoom):a)}var h={latlng:n,bounds:s,timestamp:t.timestamp};for(var l in t.coords)"number"==typeof t.coords[l]&&(h[l]=t.coords[l]);this.fire("locationfound",h)}})}(window,document);;
/* esri-leaflet - v2.0.0-beta.7 - Fri Jan 01 2016 10:31:42 GMT-0800 (PST)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?factory(exports,require("leaflet")):typeof define==="function"&&define.amd?define(["exports","leaflet"],factory):factory(global.L.esri={},L)})(this,function(exports,L){"use strict";var GeojsonUtil={get arcgisToGeoJSON(){return arcgisToGeoJSON},get geojsonToArcGIS(){return _geojsonToArcGIS}};var cors=window.XMLHttpRequest&&"withCredentials"in new window.XMLHttpRequest;var pointerEvents=document.documentElement.style.pointerEvents==="";exports.Support={cors:cors,pointerEvents:pointerEvents};function pointsEqual(a,b){for(var i=0;i<a.length;i++){if(a[i]!==b[i]){return false}}return true}function closeRing(coordinates){if(!pointsEqual(coordinates[0],coordinates[coordinates.length-1])){coordinates.push(coordinates[0])}return coordinates}function ringIsClockwise(ringToTest){var total=0;var i=0;var rLength=ringToTest.length;var pt1=ringToTest[i];var pt2;for(i;i<rLength-1;i++){pt2=ringToTest[i+1];total+=(pt2[0]-pt1[0])*(pt2[1]+pt1[1]);pt1=pt2}return total>=0}function vertexIntersectsVertex(a1,a2,b1,b2){var uaT=(b2[0]-b1[0])*(a1[1]-b1[1])-(b2[1]-b1[1])*(a1[0]-b1[0]);var ubT=(a2[0]-a1[0])*(a1[1]-b1[1])-(a2[1]-a1[1])*(a1[0]-b1[0]);var uB=(b2[1]-b1[1])*(a2[0]-a1[0])-(b2[0]-b1[0])*(a2[1]-a1[1]);if(uB!==0){var ua=uaT/uB;var ub=ubT/uB;if(ua>=0&&ua<=1&&ub>=0&&ub<=1){return true}}return false}function arrayIntersectsArray(a,b){for(var i=0;i<a.length-1;i++){for(var j=0;j<b.length-1;j++){if(vertexIntersectsVertex(a[i],a[i+1],b[j],b[j+1])){return true}}}return false}function coordinatesContainPoint(coordinates,point){var contains=false;for(var i=-1,l=coordinates.length,j=l-1;++i<l;j=i){if((coordinates[i][1]<=point[1]&&point[1]<coordinates[j][1]||coordinates[j][1]<=point[1]&&point[1]<coordinates[i][1])&&point[0]<(coordinates[j][0]-coordinates[i][0])*(point[1]-coordinates[i][1])/(coordinates[j][1]-coordinates[i][1])+coordinates[i][0]){contains=!contains}}return contains}function coordinatesContainCoordinates(outer,inner){var intersects=arrayIntersectsArray(outer,inner);var contains=coordinatesContainPoint(outer,inner[0]);if(!intersects&&contains){return true}return false}function convertRingsToGeoJSON(rings){var outerRings=[];var holes=[];var x;var outerRing;var hole;for(var r=0;r<rings.length;r++){var ring=closeRing(rings[r].slice(0));if(ring.length<4){continue}if(ringIsClockwise(ring)){var polygon=[ring];outerRings.push(polygon)}else{holes.push(ring)}}var uncontainedHoles=[];while(holes.length){hole=holes.pop();var contained=false;for(x=outerRings.length-1;x>=0;x--){outerRing=outerRings[x][0];if(coordinatesContainCoordinates(outerRing,hole)){outerRings[x].push(hole);contained=true;break}}if(!contained){uncontainedHoles.push(hole)}}while(uncontainedHoles.length){hole=uncontainedHoles.pop();var intersects=false;for(x=outerRings.length-1;x>=0;x--){outerRing=outerRings[x][0];if(arrayIntersectsArray(outerRing,hole)){outerRings[x].push(hole);intersects=true;break}}if(!intersects){outerRings.push([hole.reverse()])}}if(outerRings.length===1){return{type:"Polygon",coordinates:outerRings[0]}}else{return{type:"MultiPolygon",coordinates:outerRings}}}function orientRings(poly){var output=[];var polygon=poly.slice(0);var outerRing=closeRing(polygon.shift().slice(0));if(outerRing.length>=4){if(!ringIsClockwise(outerRing)){outerRing.reverse()}output.push(outerRing);for(var i=0;i<polygon.length;i++){var hole=closeRing(polygon[i].slice(0));if(hole.length>=4){if(ringIsClockwise(hole)){hole.reverse()}output.push(hole)}}}return output}function flattenMultiPolygonRings(rings){var output=[];for(var i=0;i<rings.length;i++){var polygon=orientRings(rings[i]);for(var x=polygon.length-1;x>=0;x--){var ring=polygon[x].slice(0);output.push(ring)}}return output}function _shallowClone(obj){var target={};for(var i in obj){if(obj.hasOwnProperty(i)){target[i]=obj[i]}}return target}function arcgisToGeoJSON(arcgis,idAttribute){var geojson={};if(typeof arcgis.x==="number"&&typeof arcgis.y==="number"){geojson.type="Point";geojson.coordinates=[arcgis.x,arcgis.y]}if(arcgis.points){geojson.type="MultiPoint";geojson.coordinates=arcgis.points.slice(0)}if(arcgis.paths){if(arcgis.paths.length===1){geojson.type="LineString";geojson.coordinates=arcgis.paths[0].slice(0)}else{geojson.type="MultiLineString";geojson.coordinates=arcgis.paths.slice(0)}}if(arcgis.rings){geojson=convertRingsToGeoJSON(arcgis.rings.slice(0))}if(arcgis.geometry||arcgis.attributes){geojson.type="Feature";geojson.geometry=arcgis.geometry?arcgisToGeoJSON(arcgis.geometry):null;geojson.properties=arcgis.attributes?_shallowClone(arcgis.attributes):null;if(arcgis.attributes){geojson.id=arcgis.attributes[idAttribute]||arcgis.attributes.OBJECTID||arcgis.attributes.FID}}return geojson}function _geojsonToArcGIS(geojson,idAttribute){idAttribute=idAttribute||"OBJECTID";var spatialReference={wkid:4326};var result={};var i;switch(geojson.type){case"Point":result.x=geojson.coordinates[0];result.y=geojson.coordinates[1];result.spatialReference=spatialReference;break;case"MultiPoint":result.points=geojson.coordinates.slice(0);result.spatialReference=spatialReference;break;case"LineString":result.paths=[geojson.coordinates.slice(0)];result.spatialReference=spatialReference;break;case"MultiLineString":result.paths=geojson.coordinates.slice(0);result.spatialReference=spatialReference;break;case"Polygon":result.rings=orientRings(geojson.coordinates.slice(0));result.spatialReference=spatialReference;break;case"MultiPolygon":result.rings=flattenMultiPolygonRings(geojson.coordinates.slice(0));result.spatialReference=spatialReference;break;case"Feature":if(geojson.geometry){result.geometry=_geojsonToArcGIS(geojson.geometry,idAttribute)}result.attributes=geojson.properties?_shallowClone(geojson.properties):{};if(geojson.id){result.attributes[idAttribute]=geojson.id}break;case"FeatureCollection":result=[];for(i=0;i<geojson.features.length;i++){result.push(_geojsonToArcGIS(geojson.features[i],idAttribute))}break;case"GeometryCollection":result=[];for(i=0;i<geojson.geometries.length;i++){result.push(_geojsonToArcGIS(geojson.geometries[i],idAttribute))}break}return result}function shallowClone(obj){var target={};for(var i in obj){if(obj.hasOwnProperty(i)){target[i]=obj[i]}}return target}function extentToBounds(extent){var sw=L.latLng(extent.ymin,extent.xmin);var ne=L.latLng(extent.ymax,extent.xmax);return L.latLngBounds(sw,ne)}function boundsToExtent(bounds){bounds=L.latLngBounds(bounds);return{xmin:bounds.getSouthWest().lng,ymin:bounds.getSouthWest().lat,xmax:bounds.getNorthEast().lng,ymax:bounds.getNorthEast().lat,spatialReference:{wkid:4326}}}var g2a=GeojsonUtil.geojsonToArcGIS;var a2g=GeojsonUtil.arcgisToGeoJSON;function responseToFeatureCollection(response,idAttribute){var objectIdField;if(idAttribute){objectIdField=idAttribute}else if(response.objectIdFieldName){objectIdField=response.objectIdFieldName}else if(response.fields){for(var j=0;j<=response.fields.length-1;j++){if(response.fields[j].type==="esriFieldTypeOID"){objectIdField=response.fields[j].name;break}}}else{objectIdField="OBJECTID"}var featureCollection={type:"FeatureCollection",features:[]};var features=response.features||response.results;if(features.length){for(var i=features.length-1;i>=0;i--){featureCollection.features.push(GeojsonUtil.arcgisToGeoJSON(features[i],objectIdField))}}return featureCollection}function cleanUrl(url){url=L.Util.trim(url);if(url[url.length-1]!=="/"){url+="/"}return url}function isArcgisOnline(url){return/\.arcgis\.com.*?FeatureServer/g.test(url)}function geojsonTypeToArcGIS(geoJsonType){var arcgisGeometryType;switch(geoJsonType){case"Point":arcgisGeometryType="esriGeometryPoint";break;case"MultiPoint":arcgisGeometryType="esriGeometryMultipoint";break;case"LineString":arcgisGeometryType="esriGeometryPolyline";break;case"MultiLineString":arcgisGeometryType="esriGeometryPolyline";break;case"Polygon":arcgisGeometryType="esriGeometryPolygon";break;case"MultiPolygon":arcgisGeometryType="esriGeometryPolygon";break}return arcgisGeometryType}function warn(){if(console&&console.warn){console.warn.apply(console,arguments)}}exports.Util={shallowClone:shallowClone,warn:warn,cleanUrl:cleanUrl,isArcgisOnline:isArcgisOnline,geojsonTypeToArcGIS:geojsonTypeToArcGIS,responseToFeatureCollection:responseToFeatureCollection,geojsonToArcGIS:g2a,arcgisToGeojson:a2g,boundsToExtent:boundsToExtent,extentToBounds:extentToBounds};var callbacks=0;function serialize(params){var data="";params.f=params.f||"json";for(var key in params){if(params.hasOwnProperty(key)){var param=params[key];var type=Object.prototype.toString.call(param);var value;if(data.length){data+="&"}if(type==="[object Array]"){value=Object.prototype.toString.call(param[0])==="[object Object]"?JSON.stringify(param):param.join(",")}else if(type==="[object Object]"){value=JSON.stringify(param)}else if(type==="[object Date]"){value=param.valueOf()}else{value=param}data+=encodeURIComponent(key)+"="+encodeURIComponent(value)}}return data}function createRequest(callback,context){var httpRequest=new window.XMLHttpRequest;httpRequest.onerror=function(e){httpRequest.onreadystatechange=L.Util.falseFn;callback.call(context,{error:{code:500,message:"XMLHttpRequest error"}},null)};httpRequest.onreadystatechange=function(){var response;var error;if(httpRequest.readyState===4){try{response=JSON.parse(httpRequest.responseText)}catch(e){response=null;error={code:500,message:"Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error."}}if(!error&&response.error){error=response.error;response=null}httpRequest.onerror=L.Util.falseFn;callback.call(context,error,response)}};return httpRequest}function xmlHttpPost(url,params,callback,context){var httpRequest=createRequest(callback,context);httpRequest.open("POST",url);httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");httpRequest.send(serialize(params));return httpRequest}function xmlHttpGet(url,params,callback,context){var httpRequest=createRequest(callback,context);httpRequest.open("GET",url+"?"+serialize(params),true);httpRequest.send(null);return httpRequest}function request(url,params,callback,context){var paramString=serialize(params);var httpRequest=createRequest(callback,context);var requestLength=(url+"?"+paramString).length;if(requestLength<=2e3&&exports.Support.cors){httpRequest.open("GET",url+"?"+paramString);httpRequest.send(null)}else if(requestLength>2e3&&exports.Support.cors){httpRequest.open("POST",url);httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");httpRequest.send(paramString)}else if(requestLength<=2e3&&!exports.Support.cors){return jsonp(url,params,callback,context)}else{warn("a request to "+url+" was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html");return}return httpRequest}function jsonp(url,params,callback,context){window._EsriLeafletCallbacks=window._EsriLeafletCallbacks||{};var callbackId="c"+callbacks;params.callback="window._EsriLeafletCallbacks."+callbackId;var script=L.DomUtil.create("script",null,document.body);script.type="text/javascript";script.src=url+"?"+serialize(params);script.id=callbackId;window._EsriLeafletCallbacks[callbackId]=function(response){if(window._EsriLeafletCallbacks[callbackId]!==true){var error;var responseType=Object.prototype.toString.call(response);if(!(responseType==="[object Object]"||responseType==="[object Array]")){error={error:{code:500,message:"Expected array or object as JSONP response"}};response=null}if(!error&&response.error){error=response;response=null}callback.call(context,error,response);window._EsriLeafletCallbacks[callbackId]=true}};callbacks++;return{id:callbackId,url:script.src,abort:function(){window._EsriLeafletCallbacks._callback[callbackId]({code:0,message:"Request aborted."})}}}exports.get=exports.Support.cors?xmlHttpGet:jsonp;exports.get.CORS=xmlHttpGet;exports.get.JSONP=jsonp;var Request={request:request,get:exports.get,post:xmlHttpPost};exports.Task=L.Class.extend({options:{proxy:false,useCors:cors},generateSetter:function(param,context){return L.Util.bind(function(value){this.params[param]=value;return this},context)},initialize:function(endpoint){if(endpoint.request&&endpoint.options){this._service=endpoint;L.Util.setOptions(this,endpoint.options)}else{L.Util.setOptions(this,endpoint);this.options.url=cleanUrl(endpoint.url)}this.params=L.Util.extend({},this.params||{});if(this.setters){for(var setter in this.setters){var param=this.setters[setter];this[setter]=this.generateSetter(param,this)}}},token:function(token){if(this._service){this._service.authenticate(token)}else{this.params.token=token}return this},request:function(callback,context){if(this._service){return this._service.request(this.path,this.params,callback,context)}return this._request("request",this.path,this.params,callback,context)},_request:function(method,path,params,callback,context){var url=this.options.proxy?this.options.proxy+"?"+this.options.url+path:this.options.url+path;if((method==="get"||method==="request")&&!this.options.useCors){return Request.get.JSONP(url,params,callback,context)}return Request[method](url,params,callback,context)}});function task(options){return new exports.Task(options)}exports.Query=exports.Task.extend({setters:{offset:"offset",limit:"limit",fields:"outFields",precision:"geometryPrecision",featureIds:"objectIds",returnGeometry:"returnGeometry",token:"token"},path:"query",params:{returnGeometry:true,where:"1=1",outSr:4326,outFields:"*"},within:function(geometry){this._setGeometry(geometry);this.params.spatialRel="esriSpatialRelContains";return this},intersects:function(geometry){this._setGeometry(geometry);this.params.spatialRel="esriSpatialRelIntersects";return this},contains:function(geometry){this._setGeometry(geometry);this.params.spatialRel="esriSpatialRelWithin";return this},crosses:function(geometry){this._setGeometry(geometry);this.params.spatialRel="esriSpatialRelCrosses";return this},touches:function(geometry){this._setGeometry(geometry);this.params.spatialRel="esriSpatialRelTouches";return this},overlaps:function(geometry){this._setGeometry(geometry);this.params.spatialRel="esriSpatialRelOverlaps";return this},nearby:function(latlng,radius){latlng=L.latLng(latlng);this.params.geometry=[latlng.lng,latlng.lat];this.params.geometryType="esriGeometryPoint";this.params.spatialRel="esriSpatialRelIntersects";this.params.units="esriSRUnit_Meter";this.params.distance=radius;this.params.inSr=4326;return this},where:function(string){this.params.where=string;return this},between:function(start,end){this.params.time=[start.valueOf(),end.valueOf()];return this},simplify:function(map,factor){var mapWidth=Math.abs(map.getBounds().getWest()-map.getBounds().getEast());this.params.maxAllowableOffset=mapWidth/map.getSize().y*factor;return this},orderBy:function(fieldName,order){order=order||"ASC";this.params.orderByFields=this.params.orderByFields?this.params.orderByFields+",":"";this.params.orderByFields+=[fieldName,order].join(" ");return this},run:function(callback,context){this._cleanParams();if(exports.Util.isArcgisOnline(this.options.url)){this.params.f="geojson";return this.request(function(error,response){this._trapSQLerrors(error);callback.call(context,error,response,response)},this)}else{return this.request(function(error,response){this._trapSQLerrors(error);callback.call(context,error,response&&exports.Util.responseToFeatureCollection(response),response)},this)}},count:function(callback,context){this._cleanParams();this.params.returnCountOnly=true;return this.request(function(error,response){callback.call(this,error,response&&response.count,response)},context)},ids:function(callback,context){this._cleanParams();this.params.returnIdsOnly=true;return this.request(function(error,response){callback.call(this,error,response&&response.objectIds,response)},context)},bounds:function(callback,context){this._cleanParams();this.params.returnExtentOnly=true;return this.request(function(error,response){callback.call(context,error,response&&response.extent&&exports.Util.extentToBounds(response.extent),response)},context)},pixelSize:function(point){point=L.point(point);this.params.pixelSize=[point.x,point.y];return this},layer:function(layer){this.path=layer+"/query";return this},_trapSQLerrors:function(error){if(error){if(error.code==="400"){exports.Util.warn("one common syntax error in query requests is encasing string values in double quotes instead of single quotes")}}},_cleanParams:function(){delete this.params.returnIdsOnly;delete this.params.returnExtentOnly;delete this.params.returnCountOnly},_setGeometry:function(geometry){this.params.inSr=4326;if(geometry instanceof L.LatLngBounds){this.params.geometry=exports.Util.boundsToExtent(geometry);this.params.geometryType="esriGeometryEnvelope";return}if(geometry.getLatLng){geometry=geometry.getLatLng()}if(geometry instanceof L.LatLng){geometry={type:"Point",coordinates:[geometry.lng,geometry.lat]}}if(geometry instanceof L.GeoJSON){geometry=geometry.getLayers()[0].feature.geometry;this.params.geometry=exports.Util.geojsonToArcGIS(geometry);this.params.geometryType=exports.Util.geojsonTypeToArcGIS(geometry.type)}if(geometry.toGeoJSON){geometry=geometry.toGeoJSON()}if(geometry.type==="Feature"){geometry=geometry.geometry}if(geometry.type==="Point"||geometry.type==="LineString"||geometry.type==="Polygon"){this.params.geometry=exports.Util.geojsonToArcGIS(geometry);this.params.geometryType=exports.Util.geojsonTypeToArcGIS(geometry.type);return}exports.Util.warn("invalid geometry passed to spatial query. Should be an L.LatLng, L.LatLngBounds or L.Marker or a GeoJSON Point Line or Polygon object");return}});function query(options){return new exports.Query(options)}exports.Find=exports.Task.extend({setters:{contains:"contains",text:"searchText",fields:"searchFields",spatialReference:"sr",sr:"sr",layers:"layers",returnGeometry:"returnGeometry",maxAllowableOffset:"maxAllowableOffset",precision:"geometryPrecision",dynamicLayers:"dynamicLayers",returnZ:"returnZ",returnM:"returnM",gdbVersion:"gdbVersion",token:"token"},path:"find",params:{sr:4326,contains:true,returnGeometry:true,returnZ:true,returnM:false},layerDefs:function(id,where){this.params.layerDefs=this.params.layerDefs?this.params.layerDefs+";":"";this.params.layerDefs+=[id,where].join(":");return this},simplify:function(map,factor){var mapWidth=Math.abs(map.getBounds().getWest()-map.getBounds().getEast());this.params.maxAllowableOffset=mapWidth/map.getSize().y*factor;return this},run:function(callback,context){return this.request(function(error,response){callback.call(context,error,response&&exports.Util.responseToFeatureCollection(response),response)},context)}});function find(options){return new exports.Find(options)}exports.Identify=exports.Task.extend({path:"identify",between:function(start,end){this.params.time=[start.valueOf(),end.valueOf()];return this}});function identify(options){return new exports.Identify(options)}exports.IdentifyFeatures=exports.Identify.extend({setters:{layers:"layers",precision:"geometryPrecision",tolerance:"tolerance",returnGeometry:"returnGeometry"},params:{sr:4326,layers:"all",tolerance:3,returnGeometry:true},on:function(map){var extent=exports.Util.boundsToExtent(map.getBounds());var size=map.getSize();this.params.imageDisplay=[size.x,size.y,96];this.params.mapExtent=[extent.xmin,extent.ymin,extent.xmax,extent.ymax];return this},at:function(latlng){latlng=L.latLng(latlng);this.params.geometry=[latlng.lng,latlng.lat];this.params.geometryType="esriGeometryPoint";return this},layerDef:function(id,where){this.params.layerDefs=this.params.layerDefs?this.params.layerDefs+";":"";this.params.layerDefs+=[id,where].join(":");return this},simplify:function(map,factor){var mapWidth=Math.abs(map.getBounds().getWest()-map.getBounds().getEast());this.params.maxAllowableOffset=mapWidth/map.getSize().y*(1-factor);return this},run:function(callback,context){return this.request(function(error,response){if(error){callback.call(context,error,undefined,response);return}else{var featureCollection=exports.Util.responseToFeatureCollection(response);response.results=response.results.reverse();for(var i=0;i<featureCollection.features.length;i++){var feature=featureCollection.features[i];feature.layerId=response.results[i].layerId}callback.call(context,undefined,featureCollection,response)}})}});function identifyFeatures(options){return new exports.IdentifyFeatures(options)}exports.IdentifyImage=exports.Identify.extend({setters:{setMosaicRule:"mosaicRule",setRenderingRule:"renderingRule",setPixelSize:"pixelSize",returnCatalogItems:"returnCatalogItems",returnGeometry:"returnGeometry"},params:{returnGeometry:false},at:function(latlng){latlng=L.latLng(latlng);this.params.geometry=JSON.stringify({x:latlng.lng,y:latlng.lat,spatialReference:{wkid:4326}});this.params.geometryType="esriGeometryPoint";return this},getMosaicRule:function(){return this.params.mosaicRule},getRenderingRule:function(){return this.params.renderingRule},getPixelSize:function(){return this.params.pixelSize},run:function(callback,context){return this.request(function(error,response){callback.call(context,error,response&&this._responseToGeoJSON(response),response)},this)},_responseToGeoJSON:function(response){var location=response.location;var catalogItems=response.catalogItems;var catalogItemVisibilities=response.catalogItemVisibilities;var geoJSON={pixel:{type:"Feature",geometry:{type:"Point",coordinates:[location.x,location.y]},crs:{type:"EPSG",properties:{code:location.spatialReference.wkid}},properties:{OBJECTID:response.objectId,name:response.name,value:response.value},id:response.objectId}};if(response.properties&&response.properties.Values){geoJSON.pixel.properties.values=response.properties.Values}if(catalogItems&&catalogItems.features){geoJSON.catalogItems=exports.Util.responseToFeatureCollection(catalogItems);if(catalogItemVisibilities&&catalogItemVisibilities.length===geoJSON.catalogItems.features.length){for(var i=catalogItemVisibilities.length-1;i>=0;i--){geoJSON.catalogItems.features[i].properties.catalogItemVisibility=catalogItemVisibilities[i]}}}return geoJSON}});function identifyImage(params){return new exports.IdentifyImage(params)}exports.Service=L.Evented.extend({options:{proxy:false,useCors:cors},initialize:function(options){options=options||{};this._requestQueue=[];this._authenticating=false;L.Util.setOptions(this,options);this.options.url=cleanUrl(this.options.url)},get:function(path,params,callback,context){return this._request("get",path,params,callback,context)},post:function(path,params,callback,context){return this._request("post",path,params,callback,context)},request:function(path,params,callback,context){return this._request("request",path,params,callback,context)},metadata:function(callback,context){return this._request("get","",{},callback,context)},authenticate:function(token){this._authenticating=false;this.options.token=token;this._runQueue();return this},_request:function(method,path,params,callback,context){this.fire("requeststart",{url:this.options.url+path,params:params,method:method},true);var wrappedCallback=this._createServiceCallback(method,path,params,callback,context);if(this.options.token){params.token=this.options.token}if(this._authenticating){this._requestQueue.push([method,path,params,callback,context]);return}else{var url=this.options.proxy?this.options.proxy+"?"+this.options.url+path:this.options.url+path;if((method==="get"||method==="request")&&!this.options.useCors){return Request.get.JSONP(url,params,wrappedCallback)}else{return Request[method](url,params,wrappedCallback)}}},_createServiceCallback:function(method,path,params,callback,context){return L.Util.bind(function(error,response){if(error&&(error.code===499||error.code===498)){this._authenticating=true;this._requestQueue.push([method,path,params,callback,context]);this.fire("authenticationrequired",{authenticate:L.Util.bind(this.authenticate,this)},true);error.authenticate=L.Util.bind(this.authenticate,this)}callback.call(context,error,response);if(error){this.fire("requesterror",{url:this.options.url+path,params:params,message:error.message,code:error.code,method:method},true)}else{this.fire("requestsuccess",{url:this.options.url+path,params:params,response:response,method:method},true)}this.fire("requestend",{url:this.options.url+path,params:params,method:method},true)},this)},_runQueue:function(){for(var i=this._requestQueue.length-1;i>=0;i--){var request=this._requestQueue[i];var method=request.shift();this[method].apply(this,request)}this._requestQueue=[]}});function service(options){return new exports.Service(options)}exports.MapService=exports.Service.extend({identify:function(){return identifyFeatures(this)},find:function(){return find(this)},query:function(){return query(this)}});function mapService(options){return new exports.MapService(options)}exports.ImageService=exports.Service.extend({query:function(){return query(this)},identify:function(){return identifyImage(this)}});function imageService(options){return new exports.ImageService(options)}exports.FeatureLayerService=exports.Service.extend({options:{idAttribute:"OBJECTID"},query:function(){return query(this)},addFeature:function(feature,callback,context){delete feature.id;feature=g2a(feature);return this.post("addFeatures",{features:[feature]},function(error,response){var result=response&&response.addResults?response.addResults[0]:undefined;if(callback){callback.call(context,error||response.addResults[0].error,result)}},context)},updateFeature:function(feature,callback,context){feature=g2a(feature,this.options.idAttribute);return this.post("updateFeatures",{features:[feature]},function(error,response){var result=response&&response.updateResults?response.updateResults[0]:undefined;if(callback){callback.call(context,error||response.updateResults[0].error,result)}},context)},deleteFeature:function(id,callback,context){return this.post("deleteFeatures",{objectIds:id},function(error,response){var result=response&&response.deleteResults?response.deleteResults[0]:undefined;if(callback){callback.call(context,error||response.deleteResults[0].error,result)}},context)},deleteFeatures:function(ids,callback,context){return this.post("deleteFeatures",{objectIds:ids},function(error,response){var result=response&&response.deleteResults?response.deleteResults:undefined;if(callback){callback.call(context,error||response.deleteResults[0].error,result)}},context)}});function featureLayerService(options){return new exports.FeatureLayerService(options)}var Logo=L.Control.extend({options:{position:"bottomright",marginTop:0,marginLeft:0,marginBottom:0,marginRight:0},onAdd:function(){var div=L.DomUtil.create("div","esri-leaflet-logo");div.style.marginTop=this.options.marginTop;div.style.marginLeft=this.options.marginLeft;div.style.marginBottom=this.options.marginBottom;div.style.marginRight=this.options.marginRight;div.innerHTML='<a href="http://www.esri.com" target="_blank" style="border: none;"><img src="https://js.arcgis.com/3.13/esri/images/map/logo-sm.png" alt="Powered by Esri" style="border: none;"></a>';return div}});function logo(options){return new Logo(options)}var tileProtocol=window.location.protocol!=="https:"?"http:":"https:";exports.BasemapLayer=L.TileLayer.extend({statics:{TILES:{Streets:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",attributionUrl:"https://static.arcgis.com/attribution/World_Street_Map",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:19,subdomains:["server","services"],attribution:"Esri"}},Topographic:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",attributionUrl:"https://static.arcgis.com/attribution/World_Topo_Map",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:19,subdomains:["server","services"],attribution:"Esri"}},Oceans:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",attributionUrl:"https://static.arcgis.com/attribution/Ocean_Basemap",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:"Esri"}},OceansLabels:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}},NationalGeographic:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:"National Geographic, Esri, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp."}},DarkGray:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:"Esri, HERE, DeLorme, MapmyIndia, © OpenStreetMap contributors"}},DarkGrayLabels:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}},Gray:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:"Esri, HERE, DeLorme, MapmyIndia, © OpenStreetMap contributors"}},GrayLabels:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:16,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}},Imagery:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:19,subdomains:["server","services"],attribution:"Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community"}},ImageryLabels:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:19,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}},ImageryTransportation:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:19,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}},ShadedRelief:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:false,logoPosition:"bottomright",minZoom:1,maxZoom:13,subdomains:["server","services"],attribution:"Esri, USGS"}},ShadedReliefLabels:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:12,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}},Terrain:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:false,
logoPosition:"bottomright",minZoom:1,maxZoom:13,subdomains:["server","services"],attribution:"Esri, USGS, NOAA"}},TerrainLabels:{urlTemplate:tileProtocol+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}",options:{hideLogo:true,logoPosition:"bottomright",minZoom:1,maxZoom:13,subdomains:["server","services"],pane:pointerEvents?"esri-labels":"tilePane"}}}},initialize:function(key,options){var config;if(typeof key==="object"&&key.urlTemplate&&key.options){config=key}else if(typeof key==="string"&&exports.BasemapLayer.TILES[key]){config=exports.BasemapLayer.TILES[key]}else{throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain" or "TerrainLabels"')}var tileOptions=L.Util.extend(config.options,options);L.Util.setOptions(this,tileOptions);L.TileLayer.prototype.initialize.call(this,config.urlTemplate,tileOptions);if(config.attributionUrl){this._getAttributionData(config.attributionUrl)}this._logo=logo({position:this.options.logoPosition})},onAdd:function(map){if(!this.options.hideLogo&&!map._hasEsriLogo){this._logo.addTo(map);map._hasEsriLogo=true}if(this.options.pane==="esri-labels"){this._initPane()}map.on("moveend",this._updateMapAttribution,this);L.TileLayer.prototype.onAdd.call(this,map)},onRemove:function(map){if(this._logo&&this._logo._container){map.removeControl(this._logo);map._hasEsriLogo=false}map.off("moveend",this._updateMapAttribution,this);L.TileLayer.prototype.onRemove.call(this,map)},getAttribution:function(){if(this.options.attribution){var attribution='<span class="esri-attributions" style="line-height:14px; vertical-align: -3px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; display:inline-block;">'+this.options.attribution+"</span>"}return attribution},_initPane:function(){if(!this._map.getPane(this.options.pane)){var pane=this._map.createPane(this.options.pane);pane.style.pointerEvents="none";pane.style.zIndex=500}},_getAttributionData:function(url){jsonp(url,{},L.Util.bind(function(error,attributions){if(error){return}this._attributions=[];for(var c=0;c<attributions.contributors.length;c++){var contributor=attributions.contributors[c];for(var i=0;i<contributor.coverageAreas.length;i++){var coverageArea=contributor.coverageAreas[i];var southWest=L.latLng(coverageArea.bbox[0],coverageArea.bbox[1]);var northEast=L.latLng(coverageArea.bbox[2],coverageArea.bbox[3]);this._attributions.push({attribution:contributor.attribution,score:coverageArea.score,bounds:L.latLngBounds(southWest,northEast),minZoom:coverageArea.zoomMin,maxZoom:coverageArea.zoomMax})}}this._attributions.sort(function(a,b){return b.score-a.score});this._updateMapAttribution()},this))},_updateMapAttribution:function(){if(this._map&&this._map.attributionControl&&this._attributions){var newAttributions="";var bounds=this._map.getBounds();var zoom=this._map.getZoom();for(var i=0;i<this._attributions.length;i++){var attribution=this._attributions[i];var text=attribution.attribution;if(!newAttributions.match(text)&&bounds.intersects(attribution.bounds)&&zoom>=attribution.minZoom&&zoom<=attribution.maxZoom){newAttributions+=", "+text}}newAttributions=newAttributions.substr(2);var attributionElement=this._map.attributionControl._container.querySelector(".esri-attributions");attributionElement.innerHTML=newAttributions;attributionElement.style.maxWidth=this._map.getSize().x*.65+"px";this.fire("attributionupdated",{attribution:newAttributions})}}});function basemapLayer(key,options){return new exports.BasemapLayer(key,options)}exports.TiledMapLayer=L.TileLayer.extend({options:{zoomOffsetAllowance:.1},statics:{MercatorZoomLevels:{0:156543.033928,1:78271.5169639999,2:39135.7584820001,3:19567.8792409999,4:9783.93962049996,5:4891.96981024998,6:2445.98490512499,7:1222.99245256249,8:611.49622628138,9:305.748113140558,10:152.874056570411,11:76.4370282850732,12:38.2185141425366,13:19.1092570712683,14:9.55462853563415,15:4.77731426794937,16:2.38865713397468,17:1.19432856685505,18:.597164283559817,19:.298582141647617,20:.14929107082381,21:.07464553541191,22:.0373227677059525,23:.0186613838529763}},initialize:function(options){options.url=cleanUrl(options.url);options=L.Util.setOptions(this,options);this.tileUrl=options.url+"tile/{z}/{y}/{x}";this.service=mapService(options);this.service.addEventParent(this);var arcgisonline=new RegExp(/tiles.arcgis(online)?\.com/g);if(arcgisonline.test(options.url)){this.tileUrl=this.tileUrl.replace("://tiles","://tiles{s}");options.subdomains=["1","2","3","4"]}if(this.options.token){this.tileUrl+="?token="+this.options.token}L.TileLayer.prototype.initialize.call(this,this.tileUrl,options)},getTileUrl:function(tilePoint){return L.Util.template(this.tileUrl,L.extend({s:this._getSubdomain(tilePoint),z:this._lodMap&&this._lodMap[tilePoint.z]?this._lodMap[tilePoint.z]:tilePoint.z,x:tilePoint.x,y:tilePoint.y},this.options))},createTile:function(coords,done){var tile=document.createElement("img");L.DomEvent.on(tile,"load",L.bind(this._tileOnLoad,this,done,tile));L.DomEvent.on(tile,"error",L.bind(this._tileOnError,this,done,tile));if(this.options.crossOrigin){tile.crossOrigin=""}tile.alt="";if(!this._lodMap||this._lodMap&&this._lodMap[coords.z]){tile.src=this.getTileUrl(coords)}else{this.once("lodmap",function(){tile.src=this.getTileUrl(coords)},this)}return tile},onAdd:function(map){if(map.options.crs===L.CRS.EPSG3857&&!this._lodMap){this._lodMap={};this.metadata(function(error,metadata){if(!error){var sr=metadata.spatialReference.latestWkid||metadata.spatialReference.wkid;if(sr===102100||sr===3857){var arcgisLODs=metadata.tileInfo.lods;var correctResolutions=exports.TiledMapLayer.MercatorZoomLevels;for(var i=0;i<arcgisLODs.length;i++){var arcgisLOD=arcgisLODs[i];for(var ci in correctResolutions){var correctRes=correctResolutions[ci];if(this._withinPercentage(arcgisLOD.resolution,correctRes,this.options.zoomOffsetAllowance)){this._lodMap[ci]=arcgisLOD.level;break}}}this.fire("lodmap")}else{warn("L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html")}}},this)}L.TileLayer.prototype.onAdd.call(this,map)},metadata:function(callback,context){this.service.metadata(callback,context);return this},identify:function(){return this.service.identify()},find:function(){return this.service.find()},query:function(){return this.service.query()},authenticate:function(token){var tokenQs="?token="+token;this.tileUrl=this.options.token?this.tileUrl.replace(/\?token=(.+)/g,tokenQs):this.tileUrl+tokenQs;this.options.token=token;this.service.authenticate(token);return this},_withinPercentage:function(a,b,percentage){var diff=Math.abs(a/b-1);return diff<percentage}});function tiledMapLayer(url,options){return new exports.TiledMapLayer(url,options)}var Overlay=L.ImageOverlay.extend({onAdd:function(map){this._topLeft=map.getPixelBounds().min;L.ImageOverlay.prototype.onAdd.call(this,map)},_reset:function(){if(this._map.options.crs===L.CRS.EPSG3857){L.ImageOverlay.prototype._reset.call(this)}else{L.DomUtil.setPosition(this._image,this._topLeft.subtract(this._map.getPixelOrigin()))}}});exports.RasterLayer=L.Layer.extend({options:{opacity:1,position:"front",f:"image",useCors:cors,attribution:null,interactive:false,alt:""},onAdd:function(map){this._update=L.Util.throttle(this._update,this.options.updateInterval,this);map.on("moveend",this._update,this);if(this._currentImage&&this._currentImage._bounds.equals(this._map.getBounds())){map.addLayer(this._currentImage)}else if(this._currentImage){this._map.removeLayer(this._currentImage);this._currentImage=null}this._update();if(this._popup){this._map.on("click",this._getPopupData,this);this._map.on("dblclick",this._resetPopupState,this)}},onRemove:function(map){if(this._currentImage){this._map.removeLayer(this._currentImage)}if(this._popup){this._map.off("click",this._getPopupData,this);this._map.off("dblclick",this._resetPopupState,this)}this._map.off("moveend",this._update,this)},getEvents:function(){return{moveend:this._update}},bindPopup:function(fn,popupOptions){this._shouldRenderPopup=false;this._lastClick=false;this._popup=L.popup(popupOptions);this._popupFunction=fn;if(this._map){this._map.on("click",this._getPopupData,this);this._map.on("dblclick",this._resetPopupState,this)}return this},unbindPopup:function(){if(this._map){this._map.closePopup(this._popup);this._map.off("click",this._getPopupData,this);this._map.off("dblclick",this._resetPopupState,this)}this._popup=false;return this},bringToFront:function(){this.options.position="front";if(this._currentImage){this._currentImage.bringToFront()}return this},bringToBack:function(){this.options.position="back";if(this._currentImage){this._currentImage.bringToBack()}return this},getAttribution:function(){return this.options.attribution},getOpacity:function(){return this.options.opacity},setOpacity:function(opacity){this.options.opacity=opacity;this._currentImage.setOpacity(opacity);return this},getTimeRange:function(){return[this.options.from,this.options.to]},setTimeRange:function(from,to){this.options.from=from;this.options.to=to;this._update();return this},metadata:function(callback,context){this.service.metadata(callback,context);return this},authenticate:function(token){this.service.authenticate(token);return this},_renderImage:function(url,bounds){if(this._map){var image=new Overlay(url,bounds,{opacity:0,crossOrigin:this.options.useCors,alt:this.options.alt,pane:this.options.pane||this.getPane(),interactive:this.options.interactive}).addTo(this._map);image.once("load",function(e){if(this._map){var newImage=e.target;var oldImage=this._currentImage;if(newImage._bounds.equals(bounds)&&newImage._bounds.equals(this._map.getBounds())){this._currentImage=newImage;if(this.options.position==="front"){this.bringToFront()}else{this.bringToBack()}if(this._map&&this._currentImage._map){this._currentImage.setOpacity(this.options.opacity)}else{this._currentImage._map.removeLayer(this._currentImage)}if(oldImage&&this._map){this._map.removeLayer(oldImage)}if(oldImage&&oldImage._map){oldImage._map.removeLayer(oldImage)}}else{this._map.removeLayer(newImage)}}this.fire("load",{bounds:bounds})},this);this.fire("loading",{bounds:bounds})}},_update:function(){if(!this._map){return}var zoom=this._map.getZoom();var bounds=this._map.getBounds();if(this._animatingZoom){return}if(this._map._panTransition&&this._map._panTransition._inProgress){return}if(zoom>this.options.maxZoom||zoom<this.options.minZoom){return}var params=this._buildExportParams();this._requestExport(params,bounds)},_renderPopup:function(latlng,error,results,response){latlng=L.latLng(latlng);if(this._shouldRenderPopup&&this._lastClick.equals(latlng)){var content=this._popupFunction(error,results,response);if(content){this._popup.setLatLng(latlng).setContent(content).openOn(this._map)}}},_resetPopupState:function(e){this._shouldRenderPopup=false;this._lastClick=e.latlng}});exports.ImageMapLayer=exports.RasterLayer.extend({options:{updateInterval:150,format:"jpgpng",transparent:true,f:"json"},query:function(){return this.service.query()},identify:function(){return this.service.identify()},initialize:function(options){options.url=cleanUrl(options.url);this.service=imageService(options);this.service.addEventParent(this);L.Util.setOptions(this,options)},setPixelType:function(pixelType){this.options.pixelType=pixelType;this._update();return this},getPixelType:function(){return this.options.pixelType},setBandIds:function(bandIds){if(L.Util.isArray(bandIds)){this.options.bandIds=bandIds.join(",")}else{this.options.bandIds=bandIds.toString()}this._update();return this},getBandIds:function(){return this.options.bandIds},setNoData:function(noData,noDataInterpretation){if(L.Util.isArray(noData)){this.options.noData=noData.join(",")}else{this.options.noData=noData.toString()}if(noDataInterpretation){this.options.noDataInterpretation=noDataInterpretation}this._update();return this},getNoData:function(){return this.options.noData},getNoDataInterpretation:function(){return this.options.noDataInterpretation},setRenderingRule:function(renderingRule){this.options.renderingRule=renderingRule;this._update()},getRenderingRule:function(){return this.options.renderingRule},setMosaicRule:function(mosaicRule){this.options.mosaicRule=mosaicRule;this._update()},getMosaicRule:function(){return this.options.mosaicRule},_getPopupData:function(e){var callback=L.Util.bind(function(error,results,response){if(error){return}setTimeout(L.Util.bind(function(){this._renderPopup(e.latlng,error,results,response)},this),300)},this);var identifyRequest=this.identify().at(e.latlng);if(this.options.mosaicRule){identifyRequest.setMosaicRule(this.options.mosaicRule)}identifyRequest.run(callback);this._shouldRenderPopup=true;this._lastClick=e.latlng},_buildExportParams:function(){var bounds=this._map.getBounds();var size=this._map.getSize();var ne=this._map.options.crs.project(bounds._northEast);var sw=this._map.options.crs.project(bounds._southWest);var sr=parseInt(this._map.options.crs.code.split(":")[1],10);var params={bbox:[sw.x,sw.y,ne.x,ne.y].join(","),size:size.x+","+size.y,format:this.options.format,transparent:this.options.transparent,bboxSR:sr,imageSR:sr};if(this.options.from&&this.options.to){params.time=this.options.from.valueOf()+","+this.options.to.valueOf()}if(this.options.pixelType){params.pixelType=this.options.pixelType}if(this.options.interpolation){params.interpolation=this.options.interpolation}if(this.options.compressionQuality){params.compressionQuality=this.options.compressionQuality}if(this.options.bandIds){params.bandIds=this.options.bandIds}if(this.options.noData){params.noData=this.options.noData}if(this.options.noDataInterpretation){params.noDataInterpretation=this.options.noDataInterpretation}if(this.service.options.token){params.token=this.service.options.token}if(this.options.renderingRule){params.renderingRule=JSON.stringify(this.options.renderingRule)}if(this.options.mosaicRule){params.mosaicRule=JSON.stringify(this.options.mosaicRule)}return params},_requestExport:function(params,bounds){if(this.options.f==="json"){this.service.request("exportImage",params,function(error,response){if(error){return}this._renderImage(response.href,bounds)},this)}else{params.f="image";this._renderImage(this.options.url+"exportImage"+L.Util.getParamString(params),bounds)}}});function imageMapLayer(url,options){return new exports.ImageMapLayer(url,options)}exports.DynamicMapLayer=exports.RasterLayer.extend({options:{updateInterval:150,layers:false,layerDefs:false,timeOptions:false,format:"png24",transparent:true,f:"json"},initialize:function(options){options.url=cleanUrl(options.url);this.service=mapService(options);this.service.addEventParent(this);if((options.proxy||options.token)&&options.f!=="json"){options.f="json"}L.Util.setOptions(this,options)},getDynamicLayers:function(){return this.options.dynamicLayers},setDynamicLayers:function(dynamicLayers){this.options.dynamicLayers=dynamicLayers;this._update();return this},getLayers:function(){return this.options.layers},setLayers:function(layers){this.options.layers=layers;this._update();return this},getLayerDefs:function(){return this.options.layerDefs},setLayerDefs:function(layerDefs){this.options.layerDefs=layerDefs;this._update();return this},getTimeOptions:function(){return this.options.timeOptions},setTimeOptions:function(timeOptions){this.options.timeOptions=timeOptions;this._update();return this},query:function(){return this.service.query()},identify:function(){return this.service.identify()},find:function(){return this.service.find()},_getPopupData:function(e){var callback=L.Util.bind(function(error,featureCollection,response){if(error){return}setTimeout(L.Util.bind(function(){this._renderPopup(e.latlng,error,featureCollection,response)},this),300)},this);var identifyRequest=this.identify().on(this._map).at(e.latlng);if(this.options.layers){identifyRequest.layers("visible:"+this.options.layers.join(","))}else{identifyRequest.layers("visible")}identifyRequest.run(callback);this._shouldRenderPopup=true;this._lastClick=e.latlng},_buildExportParams:function(){var bounds=this._map.getBounds();var size=this._map.getSize();var ne=this._map.options.crs.project(bounds.getNorthEast());var sw=this._map.options.crs.project(bounds.getSouthWest());var sr=parseInt(this._map.options.crs.code.split(":")[1],10);var top=this._map.latLngToLayerPoint(bounds._northEast);var bottom=this._map.latLngToLayerPoint(bounds._southWest);if(top.y>0||bottom.y<size.y){size.y=bottom.y-top.y}var params={bbox:[sw.x,sw.y,ne.x,ne.y].join(","),size:size.x+","+size.y,dpi:96,format:this.options.format,transparent:this.options.transparent,bboxSR:sr,imageSR:sr};if(this.options.dynamicLayers){params.dynamicLayers=this.options.dynamicLayers}if(this.options.layers){params.layers="show:"+this.options.layers.join(",")}if(this.options.layerDefs){params.layerDefs=JSON.stringify(this.options.layerDefs)}if(this.options.timeOptions){params.timeOptions=JSON.stringify(this.options.timeOptions)}if(this.options.from&&this.options.to){params.time=this.options.from.valueOf()+","+this.options.to.valueOf()}if(this.service.options.token){params.token=this.service.options.token}return params},_requestExport:function(params,bounds){if(this.options.f==="json"){this.service.request("export",params,function(error,response){if(error){return}this._renderImage(response.href,bounds)},this)}else{params.f="image";this._renderImage(this.options.url+"export"+L.Util.getParamString(params),bounds)}}});function dynamicMapLayer(url,options){return new exports.DynamicMapLayer(url,options)}var VirtualGrid=L.Layer.extend({options:{cellSize:512,updateInterval:150},initialize:function(options){options=L.setOptions(this,options);this._zooming=false},onAdd:function(map){this._map=map;this._update=L.Util.throttle(this._update,this.options.updateInterval,this);this._reset();this._update()},onRemove:function(){this._map.removeEventListener(this.getEvents(),this);this._removeCells()},getEvents:function(){var events={moveend:this._update,zoomstart:this._zoomstart,zoomend:this._reset};return events},addTo:function(map){map.addLayer(this);return this},removeFrom:function(map){map.removeLayer(this);return this},_zoomstart:function(){this._zooming=true},_reset:function(){this._removeCells();this._cells={};this._activeCells={};this._cellsToLoad=0;this._cellsTotal=0;this._cellNumBounds=this._getCellNumBounds();this._resetWrap();this._zooming=false},_resetWrap:function(){var map=this._map;var crs=map.options.crs;if(crs.infinite){return}var cellSize=this._getCellSize();if(crs.wrapLng){this._wrapLng=[Math.floor(map.project([0,crs.wrapLng[0]]).x/cellSize),Math.ceil(map.project([0,crs.wrapLng[1]]).x/cellSize)]}if(crs.wrapLat){this._wrapLat=[Math.floor(map.project([crs.wrapLat[0],0]).y/cellSize),Math.ceil(map.project([crs.wrapLat[1],0]).y/cellSize)]}},_getCellSize:function(){return this.options.cellSize},_update:function(){if(!this._map){return}var bounds=this._map.getPixelBounds();var cellSize=this._getCellSize();var cellBounds=L.bounds(bounds.min.divideBy(cellSize).floor(),bounds.max.divideBy(cellSize).floor());this._removeOtherCells(cellBounds);this._addCells(cellBounds);this.fire("cellsupdated")},_addCells:function(bounds){var queue=[];var center=bounds.getCenter();var zoom=this._map.getZoom();var j,i,coords;for(j=bounds.min.y;j<=bounds.max.y;j++){for(i=bounds.min.x;i<=bounds.max.x;i++){coords=L.point(i,j);coords.z=zoom;if(this._isValidCell(coords)){queue.push(coords)}}}var cellsToLoad=queue.length;if(cellsToLoad===0){return}this._cellsToLoad+=cellsToLoad;this._cellsTotal+=cellsToLoad;queue.sort(function(a,b){return a.distanceTo(center)-b.distanceTo(center)});for(i=0;i<cellsToLoad;i++){this._addCell(queue[i])}},_isValidCell:function(coords){var crs=this._map.options.crs;if(!crs.infinite){var bounds=this._cellNumBounds;if(!crs.wrapLng&&(coords.x<bounds.min.x||coords.x>bounds.max.x)||!crs.wrapLat&&(coords.y<bounds.min.y||coords.y>bounds.max.y)){return false}}if(!this.options.bounds){return true}var cellBounds=this._cellCoordsToBounds(coords);return L.latLngBounds(this.options.bounds).intersects(cellBounds)},_cellCoordsToBounds:function(coords){var map=this._map;var cellSize=this.options.cellSize;var nwPoint=coords.multiplyBy(cellSize);var sePoint=nwPoint.add([cellSize,cellSize]);var nw=map.wrapLatLng(map.unproject(nwPoint,coords.z));var se=map.wrapLatLng(map.unproject(sePoint,coords.z));return L.latLngBounds(nw,se)},_cellCoordsToKey:function(coords){return coords.x+":"+coords.y},_keyToCellCoords:function(key){var kArr=key.split(":");var x=parseInt(kArr[0],10);var y=parseInt(kArr[1],10);return L.point(x,y)},_removeOtherCells:function(bounds){for(var key in this._cells){if(!bounds.contains(this._keyToCellCoords(key))){this._removeCell(key)}}},_removeCell:function(key){var cell=this._activeCells[key];if(cell){delete this._activeCells[key];if(this.cellLeave){this.cellLeave(cell.bounds,cell.coords)}this.fire("cellleave",{bounds:cell.bounds,coords:cell.coords})}},_removeCells:function(){for(var key in this._cells){var bounds=this._cells[key].bounds;var coords=this._cells[key].coords;if(this.cellLeave){this.cellLeave(bounds,coords)}this.fire("cellleave",{bounds:bounds,coords:coords})}},_addCell:function(coords){this._wrapCoords(coords);var key=this._cellCoordsToKey(coords);var cell=this._cells[key];if(cell&&!this._activeCells[key]){if(this.cellEnter){this.cellEnter(cell.bounds,coords)}this.fire("cellenter",{bounds:cell.bounds,coords:coords});this._activeCells[key]=cell}if(!cell){cell={coords:coords,bounds:this._cellCoordsToBounds(coords)};this._cells[key]=cell;this._activeCells[key]=cell;if(this.createCell){this.createCell(cell.bounds,coords)}this.fire("cellcreate",{bounds:cell.bounds,coords:coords})}},_wrapCoords:function(coords){coords.x=this._wrapLng?L.Util.wrapNum(coords.x,this._wrapLng):coords.x;coords.y=this._wrapLat?L.Util.wrapNum(coords.y,this._wrapLat):coords.y},_getCellNumBounds:function(){var bounds=this._map.getPixelWorldBounds();var size=this._getCellSize();return bounds?L.bounds(bounds.min.divideBy(size).floor(),bounds.max.divideBy(size).ceil().subtract([1,1])):null}});function BinarySearchIndex(values){this.values=[].concat(values||[])}BinarySearchIndex.prototype.query=function(value){var index=this.getIndex(value);return this.values[index]};BinarySearchIndex.prototype.getIndex=function getIndex(value){if(this.dirty){this.sort()}var minIndex=0;var maxIndex=this.values.length-1;var currentIndex;var currentElement;while(minIndex<=maxIndex){currentIndex=(minIndex+maxIndex)/2|0;currentElement=this.values[Math.round(currentIndex)];if(+currentElement.value<+value){minIndex=currentIndex+1}else if(+currentElement.value>+value){maxIndex=currentIndex-1}else{return currentIndex}}return Math.abs(~maxIndex)};BinarySearchIndex.prototype.between=function between(start,end){var startIndex=this.getIndex(start);var endIndex=this.getIndex(end);if(startIndex===0&&endIndex===0){return[]}while(this.values[startIndex-1]&&this.values[startIndex-1].value===start){startIndex--}while(this.values[endIndex+1]&&this.values[endIndex+1].value===end){endIndex++}if(this.values[endIndex]&&this.values[endIndex].value===end&&this.values[endIndex+1]){endIndex++}return this.values.slice(startIndex,endIndex)};BinarySearchIndex.prototype.insert=function insert(item){this.values.splice(this.getIndex(item.value),0,item);return this};BinarySearchIndex.prototype.bulkAdd=function bulkAdd(items,sort){this.values=this.values.concat([].concat(items||[]));if(sort){this.sort()}else{this.dirty=true}return this};BinarySearchIndex.prototype.sort=function sort(){this.values.sort(function(a,b){return+b.value-+a.value}).reverse();this.dirty=false;return this};exports.FeatureManager=VirtualGrid.extend({options:{attribution:null,where:"1=1",fields:["*"],from:false,to:false,timeField:false,timeFilterMode:"server",simplifyFactor:0,precision:6},initialize:function(options){VirtualGrid.prototype.initialize.call(this,options);options.url=cleanUrl(options.url);options=L.setOptions(this,options);this.service=featureLayerService(options);this.service.addEventParent(this);if(this.options.fields[0]!=="*"){var oidCheck=false;for(var i=0;i<this.options.fields.length;i++){if(this.options.fields[i].match(/^(OBJECTID|FID|OID|ID)$/i)){oidCheck=true}}if(oidCheck===false){warn("no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.")}}if(this.options.timeField.start&&this.options.timeField.end){this._startTimeIndex=new BinarySearchIndex;this._endTimeIndex=new BinarySearchIndex}else if(this.options.timeField){this._timeIndex=new BinarySearchIndex}this._cache={};this._currentSnapshot=[];this._activeRequests=0},onAdd:function(map){map.on("zoomend",this._handleZoomChange,this);return VirtualGrid.prototype.onAdd.call(this,map)},onRemove:function(map){map.off("zoomend",this._handleZoomChange,this);return VirtualGrid.prototype.onRemove.call(this,map)},getAttribution:function(){return this.options.attribution},createCell:function(bounds,coords){this._requestFeatures(bounds,coords)},_requestFeatures:function(bounds,coords,callback){this._activeRequests++;if(this._activeRequests===1){this.fire("loading",{bounds:bounds},true)}return this._buildQuery(bounds).run(function(error,featureCollection,response){if(response&&response.exceededTransferLimit){this.fire("drawlimitexceeded")}if(!error&&featureCollection&&featureCollection.features.length){L.Util.requestAnimFrame(L.Util.bind(function(){this._addFeatures(featureCollection.features,coords);this._postProcessFeatures(bounds)},this))}if(!error&&featureCollection&&!featureCollection.features.length){this._postProcessFeatures(bounds)}if(callback){callback.call(this,error,featureCollection)}},this)},_postProcessFeatures:function(bounds){this._activeRequests--;if(this._activeRequests<=0){this.fire("load",{bounds:bounds})}},_cacheKey:function(coords){return coords.z+":"+coords.x+":"+coords.y},_addFeatures:function(features,coords){var key=this._cacheKey(coords);this._cache[key]=this._cache[key]||[];for(var i=features.length-1;i>=0;i--){var id=features[i].id;this._currentSnapshot.push(id);this._cache[key].push(id)}if(this.options.timeField){this._buildTimeIndexes(features)}this.createLayers(features)},_buildQuery:function(bounds){var query=this.service.query().intersects(bounds).where(this.options.where).fields(this.options.fields).precision(this.options.precision);if(this.options.simplifyFactor){query.simplify(this._map,this.options.simplifyFactor)}if(this.options.timeFilterMode==="server"&&this.options.from&&this.options.to){query.between(this.options.from,this.options.to)}return query},setWhere:function(where,callback,context){this.options.where=where&&where.length?where:"1=1";var oldSnapshot=[];var newSnapshot=[];var pendingRequests=0;var requestError=null;var requestCallback=L.Util.bind(function(error,featureCollection){if(error){requestError=error}if(featureCollection){for(var i=featureCollection.features.length-1;i>=0;i--){newSnapshot.push(featureCollection.features[i].id)}}pendingRequests--;if(pendingRequests<=0){this._currentSnapshot=newSnapshot;L.Util.requestAnimFrame(L.Util.bind(function(){this.removeLayers(oldSnapshot);this.addLayers(newSnapshot);if(callback){callback.call(context,requestError)}},this))}},this);for(var i=this._currentSnapshot.length-1;i>=0;i--){oldSnapshot.push(this._currentSnapshot[i])}for(var key in this._activeCells){pendingRequests++;var coords=this._keyToCellCoords(key);var bounds=this._cellCoordsToBounds(coords);this._requestFeatures(bounds,key,requestCallback)}return this},getWhere:function(){return this.options.where},getTimeRange:function(){return[this.options.from,this.options.to]},setTimeRange:function(from,to,callback,context){var oldFrom=this.options.from;var oldTo=this.options.to;var pendingRequests=0;var requestError=null;var requestCallback=L.Util.bind(function(error){if(error){requestError=error}this._filterExistingFeatures(oldFrom,oldTo,from,to);pendingRequests--;if(callback&&pendingRequests<=0){callback.call(context,requestError)}},this);this.options.from=from;this.options.to=to;this._filterExistingFeatures(oldFrom,oldTo,from,to);if(this.options.timeFilterMode==="server"){for(var key in this._activeCells){pendingRequests++;var coords=this._keyToCellCoords(key);var bounds=this._cellCoordsToBounds(coords);this._requestFeatures(bounds,key,requestCallback)}}return this},refresh:function(){for(var key in this._activeCells){var coords=this._keyToCellCoords(key);var bounds=this._cellCoordsToBounds(coords);this._requestFeatures(bounds,key)}if(this.redraw){this.once("load",function(){this.eachFeature(function(layer){this._redraw(layer.feature.id)},this)},this)}},_filterExistingFeatures:function(oldFrom,oldTo,newFrom,newTo){var layersToRemove=oldFrom&&oldTo?this._getFeaturesInTimeRange(oldFrom,oldTo):this._currentSnapshot;var layersToAdd=this._getFeaturesInTimeRange(newFrom,newTo);if(layersToAdd.indexOf){for(var i=0;i<layersToAdd.length;i++){var shouldRemoveLayer=layersToRemove.indexOf(layersToAdd[i]);if(shouldRemoveLayer>=0){layersToRemove.splice(shouldRemoveLayer,1)}}}L.Util.requestAnimFrame(L.Util.bind(function(){this.removeLayers(layersToRemove);this.addLayers(layersToAdd)},this))},_getFeaturesInTimeRange:function(start,end){var ids=[];var search;if(this.options.timeField.start&&this.options.timeField.end){var startTimes=this._startTimeIndex.between(start,end);var endTimes=this._endTimeIndex.between(start,end);search=startTimes.concat(endTimes)}else{search=this._timeIndex.between(start,end)}for(var i=search.length-1;i>=0;i--){ids.push(search[i].id)}return ids},_buildTimeIndexes:function(geojson){var i;var feature;if(this.options.timeField.start&&this.options.timeField.end){var startTimeEntries=[];var endTimeEntries=[];for(i=geojson.length-1;i>=0;i--){feature=geojson[i];startTimeEntries.push({id:feature.id,value:new Date(feature.properties[this.options.timeField.start])});endTimeEntries.push({id:feature.id,value:new Date(feature.properties[this.options.timeField.end])})}this._startTimeIndex.bulkAdd(startTimeEntries);this._endTimeIndex.bulkAdd(endTimeEntries)}else{var timeEntries=[];for(i=geojson.length-1;i>=0;i--){feature=geojson[i];timeEntries.push({id:feature.id,value:new Date(feature.properties[this.options.timeField])})}this._timeIndex.bulkAdd(timeEntries)}},_featureWithinTimeRange:function(feature){if(!this.options.from||!this.options.to){return true}var from=+this.options.from.valueOf();var to=+this.options.to.valueOf();if(typeof this.options.timeField==="string"){var date=+feature.properties[this.options.timeField];return date>=from&&date<=to}if(this.options.timeField.start&&this.options.timeField.end){var startDate=+feature.properties[this.options.timeField.start];var endDate=+feature.properties[this.options.timeField.end];return startDate>=from&&startDate<=to||endDate>=from&&endDate<=to}},_visibleZoom:function(){if(!this._map){return false}var zoom=this._map.getZoom();if(zoom>this.options.maxZoom||zoom<this.options.minZoom){return false}else{return true}},_handleZoomChange:function(){if(!this._visibleZoom()){this.removeLayers(this._currentSnapshot);this._currentSnapshot=[]}else{for(var i in this._activeCells){var coords=this._activeCells[i].coords;var key=this._cacheKey(coords);if(this._cache[key]){this.addLayers(self._cache[key])}}}},authenticate:function(token){this.service.authenticate(token);return this},metadata:function(callback,context){this.service.metadata(callback,context);return this},query:function(){return this.service.query()},_getMetadata:function(callback){if(this._metadata){var error;callback(error,this._metadata);
}else{this.metadata(L.Util.bind(function(error,response){this._metadata=response;callback(error,this._metadata)},this))}},addFeature:function(feature,callback,context){this._getMetadata(L.Util.bind(function(error,metadata){if(error){if(callback){callback.call(this,error,null)}return}this.service.addFeature(feature,L.Util.bind(function(error,response){if(!error){feature.properties[metadata.objectIdField]=response.objectId;feature.id=response.objectId;this.createLayers([feature])}if(callback){callback.call(context,error,response)}},this))},this))},updateFeature:function(feature,callback,context){this.service.updateFeature(feature,function(error,response){if(!error){this.removeLayers([feature.id],true);this.createLayers([feature])}if(callback){callback.call(context,error,response)}},this)},deleteFeature:function(id,callback,context){this.service.deleteFeature(id,function(error,response){if(!error&&response.objectId){this.removeLayers([response.objectId],true)}if(callback){callback.call(context,error,response)}},this)},deleteFeatures:function(ids,callback,context){return this.service.deleteFeatures(ids,function(error,response){if(!error&&response.length>0){for(var i=0;i<response.length;i++){this.removeLayers([response[i].objectId],true)}}if(callback){callback.call(context,error,response)}},this)}});exports.FeatureLayer=exports.FeatureManager.extend({options:{cacheLayers:true},initialize:function(options){exports.FeatureManager.prototype.initialize.call(this,options);this._originalStyle=this.options.style;this._layers={}},onRemove:function(map){for(var i in this._layers){map.removeLayer(this._layers[i])}return exports.FeatureManager.prototype.onRemove.call(this,map)},createNewLayer:function(geojson){var layer=L.GeoJSON.geometryToLayer(geojson,this.options);layer.defaultOptions=layer.options;return layer},_updateLayer:function(layer,geojson){var latlngs=[];var coordsToLatLng=this.options.coordsToLatLng||L.GeoJSON.coordsToLatLng;if(geojson.properties){layer.feature.properties=geojson.properties}switch(geojson.geometry.type){case"Point":latlngs=L.GeoJSON.coordsToLatLng(geojson.geometry.coordinates);layer.setLatLng(latlngs);break;case"LineString":latlngs=L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates,0,coordsToLatLng);layer.setLatLngs(latlngs);break;case"MultiLineString":latlngs=L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates,1,coordsToLatLng);layer.setLatLngs(latlngs);break;case"Polygon":latlngs=L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates,1,coordsToLatLng);layer.setLatLngs(latlngs);break;case"MultiPolygon":latlngs=L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates,2,coordsToLatLng);layer.setLatLngs(latlngs);break}},createLayers:function(features){for(var i=features.length-1;i>=0;i--){var geojson=features[i];var layer=this._layers[geojson.id];var newLayer;if(this._visibleZoom()&&layer&&!this._map.hasLayer(layer)){this._map.addLayer(layer)}if(layer&&this.options.simplifyFactor>0&&(layer.setLatLngs||layer.setLatLng)){this._updateLayer(layer,geojson)}if(!layer){newLayer=this.createNewLayer(geojson);newLayer.feature=geojson;newLayer.addEventParent(this);if(this.options.onEachFeature){this.options.onEachFeature(newLayer.feature,newLayer)}this._layers[newLayer.feature.id]=newLayer;this.setFeatureStyle(newLayer.feature.id,this.options.style);this.fire("createfeature",{feature:newLayer.feature},true);if(this._visibleZoom()&&(!this.options.timeField||this.options.timeField&&this._featureWithinTimeRange(geojson))){this._map.addLayer(newLayer)}}}},addLayers:function(ids){for(var i=ids.length-1;i>=0;i--){var layer=this._layers[ids[i]];if(layer){this.fire("addfeature",{feature:layer.feature},true);this._map.addLayer(layer)}}},removeLayers:function(ids,permanent){for(var i=ids.length-1;i>=0;i--){var id=ids[i];var layer=this._layers[id];if(layer){this.fire("removefeature",{feature:layer.feature,permanent:permanent},true);this._map.removeLayer(layer)}if(layer&&permanent){delete this._layers[id]}}},cellEnter:function(bounds,coords){if(!this._zooming&&this._map){L.Util.requestAnimFrame(L.Util.bind(function(){var cacheKey=this._cacheKey(coords);var cellKey=this._cellCoordsToKey(coords);var layers=this._cache[cacheKey];if(this._activeCells[cellKey]&&layers){this.addLayers(layers)}},this))}},cellLeave:function(bounds,coords){if(!this._zooming){L.Util.requestAnimFrame(L.Util.bind(function(){if(this._map){var cacheKey=this._cacheKey(coords);var cellKey=this._cellCoordsToKey(coords);var layers=this._cache[cacheKey];var mapBounds=this._map.getBounds();if(!this._activeCells[cellKey]&&layers){var removable=true;for(var i=0;i<layers.length;i++){var layer=this._layers[layers[i]];if(layer&&layer.getBounds&&mapBounds.intersects(layer.getBounds())){removable=false}}if(removable){this.removeLayers(layers,!this.options.cacheLayers)}if(!this.options.cacheLayers&&removable){delete this._cache[cacheKey];delete this._cells[cellKey];delete this._activeCells[cellKey]}}}},this))}},resetStyle:function(){this.options.style=this._originalStyle;this.eachFeature(function(layer){this.resetFeatureStyle(layer.feature.id)},this);return this},setStyle:function(style){this.options.style=style;this.eachFeature(function(layer){this.setFeatureStyle(layer.feature.id,style)},this);return this},resetFeatureStyle:function(id){var layer=this._layers[id];var style=this._originalStyle||L.Path.prototype.options;if(layer){L.Util.extend(layer.options,layer.defaultOptions);this.setFeatureStyle(id,style)}return this},setFeatureStyle:function(id,style){var layer=this._layers[id];if(typeof style==="function"){style=style(layer.feature)}if(layer.setStyle){layer.setStyle(style)}return this},eachFeature:function(fn,context){for(var i in this._layers){fn.call(context,this._layers[i])}return this},getFeature:function(id){return this._layers[id]},bringToBack:function(){this.eachFeature(function(layer){if(layer.bringToBack){layer.bringToBack()}})},bringToFront:function(){this.eachFeature(function(layer){if(layer.bringToFront){layer.bringToFront()}})},redraw:function(id){if(id){this._redraw(id)}return this},_redraw:function(id){var layer=this._layers[id];var geojson=layer.feature;if(layer&&layer.setIcon&&this.options.pointToLayer){if(this.options.pointToLayer){var getIcon=this.options.pointToLayer(geojson,L.latLng(geojson.geometry.coordinates[1],geojson.geometry.coordinates[0]));var updatedIcon=getIcon.options.icon;layer.setIcon(updatedIcon)}}if(layer&&layer.setStyle&&this.options.pointToLayer){var getStyle=this.options.pointToLayer(geojson,L.latLng(geojson.geometry.coordinates[1],geojson.geometry.coordinates[0]));var updatedStyle=getStyle.options;this.setFeatureStyle(geojson.id,updatedStyle)}if(layer&&layer.setStyle&&this.options.style){this.resetStyle(geojson.id)}}});function featureLayer(options){return new exports.FeatureLayer(options)}exports.VERSION="2.0.0-beta.7";exports.post=xmlHttpPost;exports.request=request;exports.task=task;exports.query=query;exports.find=find;exports.identify=identify;exports.identifyFeatures=identifyFeatures;exports.identifyImage=identifyImage;exports.service=service;exports.mapService=mapService;exports.imageService=imageService;exports.featureLayerService=featureLayerService;exports.basemapLayer=basemapLayer;exports.tiledMapLayer=tiledMapLayer;exports.imageMapLayer=imageMapLayer;exports.dynamicMapLayer=dynamicMapLayer;exports.featureLayer=featureLayer});
//# sourceMappingURL=./esri-leaflet.js.map;
/*
 Highcharts JS v4.2.3 (2016-02-08)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(E,X){typeof module==="object"&&module.exports?module.exports=E.document?X(E):X:E.Highcharts=X(E)})(typeof window!=="undefined"?window:this,function(E){function X(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw Error(c);E.console&&console.log(c)}function pb(a,b,c){this.options=b;this.elem=a;this.prop=c}function D(){var a,b=arguments,c,d={},e=function(a,b){var c,d;typeof a!=="object"&&(a={});for(d in b)b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&typeof c==="object"&&
Object.prototype.toString.call(c)!=="[object Array]"&&d!=="renderTo"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);return a};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++)d=e(d,b[a]);return d}function C(a,b){return parseInt(a,b||10)}function xa(a){return typeof a==="string"}function Y(a){return a&&typeof a==="object"}function Ia(a){return Object.prototype.toString.call(a)==="[object Array]"}function ma(a){return typeof a==="number"}function Da(a){return W.log(a)/
W.LN10}function na(a){return W.pow(10,a)}function oa(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function q(a){return a!==z&&a!==null}function K(a,b,c){var d,e;if(xa(b))q(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(q(b)&&Y(b))for(d in b)a.setAttribute(d,b[d]);return e}function ta(a){return Ia(a)?a:[a]}function Pa(a,b,c){if(b)return setTimeout(a,b,c);a.call(0,c)}function L(a,b){if(ya&&!ca&&b&&b.opacity!==z)b.filter="alpha(opacity="+b.opacity*100+")";u(a.style,
b)}function Z(a,b,c,d,e){a=y.createElement(a);b&&u(a,b);e&&L(a,{padding:0,border:"none",margin:0});c&&L(a,c);d&&d.appendChild(a);return a}function pa(a,b){var c=function(){};c.prototype=new a;u(c.prototype,b);return c}function Ja(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function Ya(a){return(Za&&Za(a)||qb||0)*6E4}function Ka(a,b){for(var c="{",d=!1,e,f,g,h,i,k=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];
if(f.length)f=f.join(":"),g=/\.([0-9])/,h=N.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e!==null&&(e=B.numberFormat(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:""))):e=Qa(f,e)}k.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}k.push(a);return k.join("")}function rb(a){return W.pow(10,T(W.log(a)/W.LN10))}function sb(a,b,c,d,e){var f,g=a,c=p(c,1);f=a/c;b||(b=[1,2,2.5,5,10],d===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(g=b[d],e&&g*c>=a||!e&&f<=(b[d]+(b[d+1]||b[d]))/
2)break;g*=c;return g}function ib(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].safeI=e;a.sort(function(a,c){d=b(a,c);return d===0?a.safeI-c.safeI:d});for(e=0;e<c;e++)delete a[e].safeI}function Ra(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function Ea(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Sa(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Ta(a){jb||(jb=Z(La));a&&jb.appendChild(a);jb.innerHTML=""}function fa(a,b){return parseFloat(a.toPrecision(b||
14))}function Ua(a,b){b.renderer.globalAnimation=p(a,b.animation)}function Fb(){var a=N.global,b=a.useUTC,c=b?"getUTC":"get",d=b?"setUTC":"set";qa=a.Date||E.Date;qb=b&&a.timezoneOffset;Za=b&&a.getTimezoneOffset;kb=function(a,c,d,h,i,k){var j;b?(j=qa.UTC.apply(0,arguments),j+=Ya(j)):j=(new qa(a,c,p(d,1),p(h,0),p(i,0),p(k,0))).getTime();return j};tb=c+"Minutes";ub=c+"Hours";vb=c+"Day";$a=c+"Date";ab=c+"Month";bb=c+"FullYear";Gb=d+"Milliseconds";Hb=d+"Seconds";Ib=d+"Minutes";Jb=d+"Hours";wb=d+"Date";
xb=d+"Month";yb=d+"FullYear"}function ia(a){if(!(this instanceof ia))return new ia(a);this.init(a)}function O(){}function Va(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function Kb(a,b,c,d,e){var f=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:b.align||(f?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(f?"middle":c?"bottom":
"top"),y:p(b.y,f?4:c?14:-6),x:p(b.x,f?c?-6:6:0)};this.textAlign=b.textAlign||(f?c?"right":"left":"center")}var z,y=E.document,W=Math,A=W.round,T=W.floor,ua=W.ceil,t=W.max,F=W.min,P=W.abs,U=W.cos,$=W.sin,ra=W.PI,ga=ra*2/360,za=E.navigator&&E.navigator.userAgent||"",Lb=E.opera,ya=/(msie|trident|edge)/i.test(za)&&!Lb,lb=y&&y.documentMode===8,mb=!ya&&/AppleWebKit/.test(za),Ma=/Firefox/.test(za),Mb=/(Mobile|Android|Windows Phone)/.test(za),Fa="http://www.w3.org/2000/svg",ca=y&&y.createElementNS&&!!y.createElementNS(Fa,
"svg").createSVGRect,Qb=Ma&&parseInt(za.split("Firefox/")[1],10)<4,ha=y&&!ca&&!ya&&!!y.createElement("canvas").getContext,cb,db,Nb={},zb=0,jb,N,Qa,G,Aa=function(){},S=[],eb=0,La="div",Rb=/^[0-9]+$/,nb=["plotTop","marginRight","marginBottom","plotLeft"],qa,kb,qb,Za,tb,ub,vb,$a,ab,bb,Gb,Hb,Ib,Jb,wb,xb,yb,I={},B;B=E.Highcharts?X(16,!0):{win:E};B.seriesTypes=I;var Ga=[],ja,sa,o,Na,Ab,Ba,M,V,H,Wa,Oa;pb.prototype={dSetter:function(){var a=this.paths[0],b=this.paths[1],c=[],d=this.now,e=a.length,f;if(d===
1)c=this.toD;else if(e===b.length&&d<1)for(;e--;)f=parseFloat(a[e]),c[e]=isNaN(f)?a[e]:d*parseFloat(b[e]-f)+f;else c=b;this.elem.attr("d",c)},update:function(){var a=this.elem,b=this.prop,c=this.now,d=this.options.step;if(this[b+"Setter"])this[b+"Setter"]();else a.attr?a.element&&a.attr(b,c):a.style[b]=c+this.unit;d&&d.call(a,c,this)},run:function(a,b,c){var d=this,e=function(a){return e.stopped?!1:d.step(a)},f;this.startTime=+new qa;this.start=a;this.end=b;this.unit=c;this.now=this.start;this.pos=
0;e.elem=this.elem;if(e()&&Ga.push(e)===1)e.timerId=setInterval(function(){for(f=0;f<Ga.length;f++)Ga[f]()||Ga.splice(f--,1);Ga.length||clearInterval(e.timerId)},13)},step:function(a){var b=+new qa,c,d=this.options;c=this.elem;var e=d.complete,f=d.duration,g=d.curAnim,h;if(c.attr&&!c.element)c=!1;else if(a||b>=f+this.startTime){this.now=this.end;this.pos=1;this.update();a=g[this.prop]=!0;for(h in g)g[h]!==!0&&(a=!1);a&&e&&e.call(c);c=!1}else this.pos=d.easing((b-this.startTime)/f),this.now=this.start+
(this.end-this.start)*this.pos,this.update(),c=!0;return c},initPath:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h=a.isArea,i=h?2:1,k=function(a){for(g=a.length;g--;)(a[g]==="M"||a[g]==="L")&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(k(b),k(c));if(d<=c.length/f&&b.length===c.length)for(;d--;)c=c.slice(0,f).concat(c),h&&(c=c.concat(c.slice(c.length-f)));a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=b.slice().splice(b.length/i-f,f*i),
e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),[].splice.apply(b,[b.length/i,0].concat(d));return[b,c]}};var u=B.extend=function(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a},p=B.pick=function(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],c!==z&&c!==null)return c},fb=B.wrap=function(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}};Qa=function(a,b,c){if(!q(b)||isNaN(b))return N.lang.invalidDate||"";var a=p(a,"%Y-%m-%d %H:%M:%S"),
d=new qa(b-Ya(b)),e,f=d[ub](),g=d[vb](),h=d[$a](),i=d[ab](),k=d[bb](),j=N.lang,l=j.weekdays,d=u({a:l[g].substr(0,3),A:l[g],d:Ja(h),e:h,w:g,b:j.shortMonths[i],B:j.months[i],m:Ja(i+1),y:k.toString().substr(2,2),Y:k,H:Ja(f),k:f,I:Ja(f%12||12),l:f%12||12,M:Ja(d[tb]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:Ja(d.getSeconds()),L:Ja(A(b%1E3),3)},B.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};
G={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};B.numberFormat=function(a,b,c,d){var a=+a||0,e=N.lang,f=(a.toString().split(".")[1]||"").length,g,h,i=Math.abs(a);b===-1?b=Math.min(f,20):isNaN(b)&&(b=2);g=String(C(i.toFixed(b)));h=g.length>3?g.length%3:0;c=p(c,e.decimalPoint);d=p(d,e.thousandsSep);a=a<0?"-":"";a+=h?g.substr(0,h)+d:"";a+=g.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+d);+b&&(d=Math.abs(i-g+Math.pow(10,-Math.max(b,f)-1)),a+=c+d.toFixed(b).slice(2));
return a};Math.easeInOutSine=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};ja=function(a,b){var c;if(b==="width")return Math.min(a.offsetWidth,a.scrollWidth)-ja(a,"padding-left")-ja(a,"padding-right");else if(b==="height")return Math.min(a.offsetHeight,a.scrollHeight)-ja(a,"padding-top")-ja(a,"padding-bottom");return(c=E.getComputedStyle(a,void 0))&&C(c.getPropertyValue(b))};sa=function(a,b){return b.indexOf?b.indexOf(a):[].indexOf.call(b,a)};Na=function(a,b){return[].filter.call(a,b)};Ba=function(a,
b){for(var c=[],d=0,e=a.length;d<e;d++)c[d]=b.call(a[d],a[d],d,a);return c};Ab=function(a){var b=y.documentElement,a=a.getBoundingClientRect();return{top:a.top+(E.pageYOffset||b.scrollTop)-(b.clientTop||0),left:a.left+(E.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}};Oa=function(a){for(var b=Ga.length;b--;)if(Ga[b].elem===a)Ga[b].stopped=!0};o=function(a,b){return Array.prototype.forEach.call(a,b)};M=function(a,b,c){function d(b){b.target=b.srcElement||E;c.call(a,b)}var e=a.hcEvents=a.hcEvents||{};
if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent){if(!a.hcEventsIE)a.hcEventsIE={};a.hcEventsIE[c.toString()]=d;a.attachEvent("on"+b,d)}e[b]||(e[b]=[]);e[b].push(c)};V=function(a,b,c){function d(b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.attachEvent&&(c=a.hcEventsIE[c.toString()],a.detachEvent("on"+b,c))}function e(){var c,e,f;if(a.nodeName)for(f in b?(c={},c[b]=!0):c=g,c)if(g[f])for(e=g[f].length;e--;)d(f,g[f][e])}var f,g=a.hcEvents,h;if(g)b?(f=g[b]||[],c?(h=
sa(c,f),h>-1&&(f.splice(h,1),g[b]=f),d(b,c)):(e(),g[b]=[])):(e(),a.hcEvents={})};H=function(a,b,c,d){var e;e=a.hcEvents;var f,g,h,i,c=c||{};if(y.createEvent&&(a.dispatchEvent||a.fireEvent))e=y.createEvent("Events"),e.initEvent(b,!0,!0),e.target=a,u(e,c),a.dispatchEvent?a.dispatchEvent(e):a.fireEvent(b,e);else if(e){e=e[b]||[];f=e.length;h=function(){c.defaultPrevented=!0};for(g=0;g<f;g++){i=e[g];if(c.stopped)return;c.preventDefault=h;c.target=a;if(!c.type)c.type=b;i.call(a,c)===!1&&c.preventDefault()}}d&&
!c.defaultPrevented&&d(c)};Wa=function(a,b,c){var d,e="",f,g,h;Y(c)||(d=arguments,c={duration:d[2],easing:d[3],complete:d[4]});if(!ma(c.duration))c.duration=400;c.easing=Math[c.easing]||Math.easeInOutSine;c.curAnim=D(b);for(h in b)g=new pb(a,c,h),f=null,h==="d"?(g.paths=g.initPath(a,a.d,b.d),g.toD=b.d,d=0,f=1):a.attr?d=a.attr(h):(d=parseFloat(ja(a,h))||0,h!=="opacity"&&(e="px")),f||(f=b[h]),f.match&&f.match("px")&&(f=f.replace(/px/g,"")),g.run(d,f,e)};if(E.jQuery)E.jQuery.fn.highcharts=function(){var a=
[].slice.call(arguments);if(this[0])return a[0]?(new (B[xa(a[0])?a.shift():"Chart"])(this[0],a[0],a[1]),this):S[K(this[0],"data-highcharts-chart")]};y&&!y.defaultView&&(ja=function(a,b){var c;c={width:"clientWidth",height:"clientHeight"}[b];if(a.style[b])return C(a.style[b]);b==="opacity"&&(b="filter");if(c)return a.style.zoom=1,a[c]-2*ja(a,"padding");c=a.currentStyle[b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()})];b==="filter"&&(c=c.replace(/alpha\(opacity=([0-9]+)\)/,function(a,b){return b/
100}));return c===""?1:C(c)});Array.prototype.forEach||(o=function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c});Array.prototype.indexOf||(sa=function(a,b){var c,d=0;if(b)for(c=b.length;d<c;d++)if(b[d]===a)return d;return-1});Array.prototype.filter||(Na=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)b(a[d],d)&&c.push(a[d]);return c});B.Fx=pb;B.inArray=sa;B.each=o;B.grep=Na;B.offset=Ab;B.map=Ba;B.addEvent=M;B.removeEvent=V;B.fireEvent=H;B.animate=Wa;B.stop=Oa;N={colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/4.2.3/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"}},subtitle:{text:"",
align:"center",style:{color:"#555555"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0,lineWidthPlus:1,radiusPlus:2},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return this.y===null?"":B.numberFormat(this.y,-1)},style:{color:"contrast",fontSize:"11px",fontWeight:"bold",textShadow:"0 0 6px contrast, 0 0 3px contrast"},
verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:0.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#909090",borderRadius:0,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{color:"#333333",fontSize:"12px",
fontWeight:"bold"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:ca,backgroundColor:"rgba(249, 249, 249, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,snap:Mb?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",
href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var aa=N.plotOptions,da=aa.line;Fb();ia.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[C(a[1]),C(a[2]),C(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[C(a[1],16),C(a[2],16),C(a[3],16),
1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[C(a[1]),C(a[2]),C(a[3]),1]}}],init:function(a){var b,c,d,e;if((this.input=a)&&a.stops)this.stops=Ba(a.stops,function(a){return new ia(a[1])});else for(d=this.parsers.length;d--&&!c;)e=this.parsers[d],(b=e.regex.exec(a))&&(c=e.parse(b));this.rgba=c||[]},get:function(a){var b=this.input,c=this.rgba,d;this.stops?(d=D(b),d.stops=[].concat(d.stops),o(this.stops,function(b,c){d.stops[c]=[d.stops[c][0],
b.get(a)]})):d=c&&!isNaN(c[0])?a==="rgb"||!a&&c[3]===1?"rgb("+c[0]+","+c[1]+","+c[2]+")":a==="a"?c[3]:"rgba("+c.join(",")+")":b;return d},brighten:function(a){var b,c=this.rgba;if(this.stops)o(this.stops,function(b){b.brighten(a)});else if(ma(a)&&a!==0)for(b=0;b<3;b++)c[b]+=C(a*255),c[b]<0&&(c[b]=0),c[b]>255&&(c[b]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};O.prototype={opacity:1,textProps:"direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
init:function(a,b){this.element=b==="span"?Z(b):y.createElementNS(Fa,b);this.renderer=a},animate:function(a,b,c){b=p(b,this.renderer.globalAnimation,!0);Oa(this);if(b){b=D(b,{});if(c)b.complete=c;Wa(this,a,b)}else this.attr(a,null,c);return this},colorGradient:function(a,b,c){var d=this.renderer,e,f,g,h,i,k,j,l,m,n,r,s=[],p;a.linearGradient?f="linearGradient":a.radialGradient&&(f="radialGradient");if(f){g=a[f];i=d.gradients;j=a.stops;n=c.radialReference;Ia(g)&&(a[f]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],
gradientUnits:"userSpaceOnUse"});f==="radialGradient"&&n&&!q(g.gradientUnits)&&(h=g,g=D(g,d.getRadialAttr(n,h),{gradientUnits:"userSpaceOnUse"}));for(r in g)r!=="id"&&s.push(r,g[r]);for(r in j)s.push(j[r]);s=s.join(",");i[s]?n=i[s].attr("id"):(g.id=n="highcharts-"+zb++,i[s]=k=d.createElement(f).attr(g).add(d.defs),k.radAttr=h,k.stops=[],o(j,function(a){a[1].indexOf("rgba")===0?(e=ia(a[1]),l=e.get("rgb"),m=e.get("a")):(l=a[1],m=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":l,"stop-opacity":m}).add(k);
k.stops.push(a)}));p="url("+d.url+"#"+n+")";c.setAttribute(b,p);c.gradient=s;a.toString=function(){return p}}},applyTextShadow:function(a){var b=this.element,c,d=a.indexOf("contrast")!==-1,e={},f=this.renderer.forExport,g=f||b.style.textShadow!==z&&!ya;if(d)e.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill));if(mb||f)e.textRendering="geometricPrecision";g?this.css(e):(this.fakeTS=!0,this.ySetter=this.xSetter,c=[].slice.call(b.getElementsByTagName("tspan")),o(a.split(/\s?,\s?/g),
function(a){var d=b.firstChild,e,f,a=a.split(" ");e=a[a.length-1];(f=a[a.length-2])&&o(c,function(a,c){var g;c===0&&(a.setAttribute("x",b.getAttribute("x")),c=b.getAttribute("y"),a.setAttribute("y",c||0),c===null&&b.setAttribute("y",0));g=a.cloneNode(1);K(g,{"class":"highcharts-text-shadow",fill:e,stroke:e,"stroke-opacity":1/t(C(f),3),"stroke-width":f,"stroke-linejoin":"round"});b.insertBefore(g,d)})}))},attr:function(a,b,c){var d,e=this.element,f,g=this,h;typeof a==="string"&&b!==z&&(d=a,a={},a[d]=
b);if(typeof a==="string")g=(this[a+"Getter"]||this._defaultGetter).call(this,a,e);else{for(d in a){b=a[d];h=!1;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d)&&(f||(this.symbolAttr(a),f=!0),h=!0);if(this.rotation&&(d==="x"||d==="y"))this.doTransform=!0;h||(h=this[d+"Setter"]||this._defaultSetter,h.call(this,b,d,e),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&this.updateShadows(d,b,h))}if(this.doTransform)this.updateTransform(),this.doTransform=
!1}c&&c();return g},updateShadows:function(a,b,c){for(var d=this.shadows,e=d.length;e--;)c.call(null,a==="height"?Math.max(b-(d[e].cutHeight||0),0):a==="d"?this.d:b,a,d[e])},addClass:function(a){var b=this.element,c=K(b,"class")||"";c.indexOf(a)===-1&&K(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;o("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=p(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",
a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a){var b,c={},d,e=this.strokeWidth||0;d=A(e)%2/2;a.x=T(a.x||this.x||0)+d;a.y=T(a.y||this.y||0)+d;a.width=T((a.width||this.width||0)-2*d);a.height=T((a.height||this.height||0)-2*d);a.strokeWidth=e;for(b in a)this[b]!==a[b]&&(this[b]=c[b]=a[b]);return c},css:function(a){var b=this.styles,c={},d=this.element,e,f,g="";e=!b;if(a&&a.color)a.fill=a.color;if(b)for(f in a)a[f]!==b[f]&&(c[f]=a[f],e=!0);if(e){e=this.textWidth=a&&a.width&&d.nodeName.toLowerCase()===
"text"&&C(a.width)||this.textWidth;b&&(a=u(b,c));this.styles=a;e&&(ha||!ca&&this.renderer.forExport)&&delete a.width;if(ya&&!ca)L(this.element,a);else{b=function(a,b){return"-"+b.toLowerCase()};for(f in a)g+=f.replace(/([A-Z])/g,b)+":"+a[f]+";";K(d,"style",g)}e&&this.added&&this.renderer.buildText(this)}return this},on:function(a,b){var c=this,d=c.element;db&&a==="click"?(d.ontouchstart=function(a){c.touchEventFired=qa.now();a.preventDefault();b.call(d,a)},d.onclick=function(a){(za.indexOf("Android")===
-1||qa.now()-(c.touchEventFired||0)>1100)&&b.call(d,a)}):d["on"+a]=b;return this},setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,
d=this.scaleY,e=this.inverted,f=this.rotation,g=this.element;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(g.getAttribute("x")||0)+" "+(g.getAttribute("y")||0)+")");(q(c)||q(d))&&a.push("scale("+p(c,1)+" "+p(d,1)+")");a.length&&g.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;
if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||xa(c))this.alignTo=d=c||"renderer",oa(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=p(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=A(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=A(g);this[this.placed?
"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(a,b){var c,d=this.renderer,e,f,g,h=this.element,i=this.styles;e=this.textStr;var k,j=h.style,l,m=d.cache,n=d.cacheKeys,r;f=p(b,this.rotation);g=f*ga;e!==z&&(r=["",f||0,i&&i.fontSize,h.style.width].join(","),r=e===""||Rb.test(e)?"num:"+e.toString().length+r:e+r);r&&!a&&(c=m[r]);if(!c){if(h.namespaceURI===Fa||d.forExport){try{l=this.fakeTS&&function(a){o(h.querySelectorAll(".highcharts-text-shadow"),function(b){b.style.display=
a})},Ma&&j.textShadow?(k=j.textShadow,j.textShadow=""):l&&l("none"),c=h.getBBox?u({},h.getBBox()):{width:h.offsetWidth,height:h.offsetHeight},k?j.textShadow=k:l&&l("")}catch(s){}if(!c||c.width<0)c={width:0,height:0}}else c=this.htmlGetBBox();if(d.isSVG){d=c.width;e=c.height;if(ya&&i&&i.fontSize==="11px"&&e.toPrecision(3)==="16.9")c.height=e=14;if(f)c.width=P(e*$(g))+P(d*U(g)),c.height=P(e*U(g))+P(d*$(g))}if(r){for(;n.length>250;)delete m[n.shift()];m[r]||n.push(r);m[r]=c}}return c},show:function(a){return this.attr({visibility:a?
"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=this.renderer,c=this.element,d;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:b.box).appendChild(c);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=
a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;Oa(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&o(c,function(b){a.safeRemoveChild(b)});d&&d.div&&d.div.childNodes.length===0;)b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,
d=b;a.alignTo&&oa(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,k,j;if(a){i=p(a.width,3);k=(a.opacity||0.15)/i;j=this.parentInverted?"(-1,-1)":"("+p(a.offsetX,1)+", "+p(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;K(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":k*e,"stroke-width":h,transform:"translate"+j,fill:"none"});if(c)K(f,"height",t(K(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):
g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this},xGetter:function(a){this.element.nodeName==="circle"&&(a={x:"cx",y:"cy"}[a]||a);return this._defaultGetter(a)},_defaultGetter:function(a){a=p(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,b,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(b,a);this[b]=a},dashstyleSetter:function(a){var b;if(a=a&&a.toLowerCase()){a=
a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=C(a[b])*this["stroke-width"];a=a.join(",").replace("NaN","none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,
b,c){this[b]=a;c.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=y.createElementNS(Fa,"title"),this.element.appendChild(b));b.appendChild(y.createTextNode(String(p(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){if(a!==this.textStr)delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this)},fillSetter:function(a,b,c){typeof a==="string"?c.setAttribute(b,a):a&&this.colorGradient(a,b,c)},visibilitySetter:function(a,b,c){a===
"inherit"?c.removeAttribute(b):c.setAttribute(b,a)},zIndexSetter:function(a,b){var c=this.renderer,d=this.parentGroup,c=(d||c).element||c.box,e,f,g=this.element,h;e=this.added;var i;q(a)&&(g.setAttribute(b,a),a=+a,this[b]===a&&(e=!1),this[b]=a);if(e){if((a=this.zIndex)&&d)d.handleZ=!0;d=c.childNodes;for(i=0;i<d.length&&!h;i++)if(e=d[i],f=K(e,"zIndex"),e!==g&&(C(f)>a||!q(a)&&q(f)))c.insertBefore(g,e),h=!0;h||c.appendChild(g)}return h},_defaultSetter:function(a,b,c){c.setAttribute(b,a)}};O.prototype.yGetter=
O.prototype.xGetter;O.prototype.translateXSetter=O.prototype.translateYSetter=O.prototype.rotationSetter=O.prototype.verticalAlignSetter=O.prototype.scaleXSetter=O.prototype.scaleYSetter=function(a,b){this[b]=a;this.doTransform=!0};O.prototype["stroke-widthSetter"]=O.prototype.strokeSetter=function(a,b,c){this[b]=a;if(this.stroke&&this["stroke-width"])this.strokeWidth=this["stroke-width"],O.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),
this.hasStroke=!0;else if(b==="stroke-width"&&a===0&&this.hasStroke)c.removeAttribute("stroke"),this.hasStroke=!1};var Ca=function(){this.init.apply(this,arguments)};Ca.prototype={Element:O,init:function(a,b,c,d,e,f){var g,d=this.createElement("svg").attr({version:"1.1"}).css(this.getStyle(d));g=d.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&K(g,"xmlns",Fa);this.isSVG=!0;this.box=g;this.boxWrapper=d;this.alignedObjects=[];this.url=(Ma||mb)&&y.getElementsByTagName("base").length?E.location.href.replace(/#.*?$/,
"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 4.2.3"));this.defs=this.createElement("defs").add();this.allowHTML=f;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);var h;if(Ma&&a.getBoundingClientRect)this.subPixelFix=b=function(){L(a,{left:0,top:0});h=a.getBoundingClientRect();L(a,{left:ua(h.left)-h.left+"px",top:ua(h.top)-h.top+"px"})},b(),
M(E,"resize",b)},getStyle:function(a){return this.style=u({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Sa(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&V(E,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;
b.init(this,a);return b},draw:function(){},getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=p(a.textStr,"").toString(),f=e.indexOf("<")!==-1,g=b.childNodes,h,i,k=K(b,"x"),j=a.styles,l=a.textWidth,m=j&&j.lineHeight,n=j&&j.textShadow,r=j&&j.textOverflow==="ellipsis",s=g.length,R=l&&!a.added&&this.box,v=function(a){return m?C(m):c.fontMetrics(/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:
j&&j.fontSize||c.style.fontSize||12,a).h},x=function(a){return a.replace(/&lt;/g,"<").replace(/&gt;/g,">")};s--;)b.removeChild(g[s]);!f&&!n&&!r&&e.indexOf(" ")===-1?b.appendChild(y.createTextNode(x(e))):(h=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,R&&R.appendChild(b),e=f?e.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[e],e[e.length-1]===
""&&e.pop(),o(e,function(e,f){var g,m=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");g=e.split("|||");o(g,function(e){if(e!==""||g.length===1){var n={},s=y.createElementNS(Fa,"tspan"),p;h.test(e)&&(p=e.match(h)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),K(s,"style",p));i.test(e)&&!d&&(K(s,"onclick",'location.href="'+e.match(i)[1]+'"'),L(s,{cursor:"pointer"}));e=x(e.replace(/<(.|\n)*?>/g,"")||" ");if(e!==" "){s.appendChild(y.createTextNode(e));if(m)n.dx=0;else if(f&&k!==null)n.x=
k;K(s,n);b.appendChild(s);!m&&f&&(!ca&&d&&L(s,{display:"block"}),K(s,"dy",v(s)));if(l){for(var n=e.replace(/([^\^])-/g,"$1- ").split(" "),R=g.length>1||f||n.length>1&&j.whiteSpace!=="nowrap",o,w,q,t=[],u=v(s),A=1,z=a.rotation,B=e,D=B.length;(R||r)&&(n.length||t.length);)a.rotation=0,o=a.getBBox(!0),q=o.width,!ca&&c.forExport&&(q=c.measureSpanWidth(s.firstChild.data,a.styles)),o=q>l,w===void 0&&(w=o),r&&w?(D/=2,B===""||!o&&D<0.5?n=[]:(o&&(w=!0),B=e.substring(0,B.length+(o?-1:1)*ua(D)),n=[B+(l>3?"\u2026":
"")],s.removeChild(s.firstChild))):!o||n.length===1?(n=t,t=[],n.length&&(A++,s=y.createElementNS(Fa,"tspan"),K(s,{dy:u,x:k}),p&&K(s,"style",p),b.appendChild(s)),q>l&&(l=q)):(s.removeChild(s.firstChild),t.unshift(n.pop())),n.length&&s.appendChild(y.createTextNode(n.join(" ").replace(/- /g,"-")));w&&a.attr("title",a.textStr);a.rotation=z}m++}}})}),R&&R.removeChild(b),n&&a.applyTextShadow&&a.applyTextShadow(n))},getContrast:function(a){a=ia(a).rgba;return a[0]+a[1]+a[2]>384?"#000000":"#FFFFFF"},button:function(a,
b,c,d,e,f,g,h,i){var k=this.label(a,b,c,i,null,null,null,null,"button"),j=0,l,m,n,r,s,p,a={x1:0,y1:0,x2:0,y2:1},e=D({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);n=e.style;delete e.style;f=D(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);r=f.style;delete f.style;g=D(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);s=g.style;delete g.style;h=D(e,{style:{color:"#CCC"}},
h);p=h.style;delete h.style;M(k.element,ya?"mouseover":"mouseenter",function(){j!==3&&k.attr(f).css(r)});M(k.element,ya?"mouseout":"mouseleave",function(){j!==3&&(l=[e,f,g][j],m=[n,r,s][j],k.attr(l).css(m))});k.setState=function(a){(k.state=j=a)?a===2?k.attr(g).css(s):a===3&&k.attr(h).css(p):k.attr(e).css(n)};return k.on("click",function(a){j!==3&&d.call(k,a)}).attr(e).css(u({cursor:"default"},n))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=A(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=A(a[2])+b%2/
2);return a},path:function(a){var b={fill:"none"};Ia(a)?b.d=a:Y(a)&&u(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=Y(a)?a:{x:a,y:b,r:c};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,c){c.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,c,d,e,f){if(Y(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){var e=Y(a)?a.r:e,g=this.createElement("rect"),
a=Y(a)?a:a===z?{}:{x:a,y:b,width:t(c,0),height:t(d,0)};if(f!==z)g.strokeWidth=f,a=g.crisp(a);if(e)a.r=e;g.rSetter=function(a,b,c){K(c,{rx:a,ry:a})};return g.attr(a)},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[p(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return q(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:"none"};arguments.length>
1&&u(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g=this,h,i=this.symbols[a],i=i&&i(A(b),A(c),d,e,f),k=/^url\((.*?)\)$/,j,l;if(i)h=this.path(i),u(h,{symbolName:a,x:b,y:c,width:d,height:e}),f&&u(h,f);else if(k.test(a))l=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(A((d-
b[0])/2),A((e-b[1])/2)))},j=a.match(k)[1],a=Nb[j]||f&&f.width&&f.height&&[f.width,f.height],h=this.image(j).attr({x:b,y:c}),h.isImg=!0,a?l(h,a):(h.attr({width:0,height:0}),Z("img",{onload:function(){this.width===0&&(L(this,{position:"absolute",top:"-999em"}),y.body.appendChild(this));l(h,Nb[j]=[this.width,this.height]);this.parentNode&&this.parentNode.removeChild(this);g.imgCount--;if(!g.imgCount)S[g.chartIndex].onload()},src:j})),this.imgCount++;return h},symbols:{circle:function(a,b,c,d){var e=
0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=U(f),k=$(f),j=U(g),g=$(g),
e=e.end-f<ra?0:1;return["M",a+c*i,b+c*k,"A",c,c,0,e,1,a+c*j,b+c*g,h?"M":"L",a+d*j,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*k,h?"":"Z"]},callout:function(a,b,c,d,e){var f=F(e&&e.r||0,c,d),g=f+6,h=e&&e.anchorX,e=e&&e.anchorY,i;i=["M",a+f,b,"L",a+c-f,b,"C",a+c,b,a+c,b,a+c,b+f,"L",a+c,b+d-f,"C",a+c,b+d,a+c,b+d,a+c-f,b+d,"L",a+f,b+d,"C",a,b+d,a,b+d,a,b+d-f,"L",a,b+f,"C",a,b,a,b,a+f,b];h&&h>c&&e>b+g&&e<b+d-g?i.splice(13,3,"L",a+c,e-6,a+c+6,e,a+c,e+6,a+c,b+d-f):h&&h<0&&e>b+g&&e<b+d-g?i.splice(33,3,"L",a,e+6,a-6,e,
a,e-6,a,b+f):e&&e>d&&h>a+g&&h<a+c-g?i.splice(23,3,"L",h+6,b+d,h,b+d+6,h-6,b+d,a+f,b+d):e&&e<0&&h>a+g&&h<a+c-g&&i.splice(3,3,"L",h-6,b,h,b-6,h+6,b,c-f,b);return i}},clipRect:function(a,b,c,d){var e="highcharts-"+zb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;a.count=0;return a},text:function(a,b,c,d){var e=ha||!ca&&this.forExport,f={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,b,c);f.x=Math.round(b||0);if(c)f.y=Math.round(c);
if(a||a===0)f.text=a;a=this.createElement("text").attr(f);e&&a.css({position:"absolute"});if(!d)a.xSetter=function(a,b,c){var d=c.getElementsByTagName("tspan"),e,f=c.getAttribute(b),m;for(m=0;m<d.length;m++)e=d[m],e.getAttribute(b)===f&&e.setAttribute(b,a);c.setAttribute(b,a)};return a},fontMetrics:function(a,b){var c,d,a=a||this.style.fontSize;!a&&b&&E.getComputedStyle&&(b=b.element||b,a=(c=E.getComputedStyle(b,""))&&c.fontSize);a=/px/.test(a)?C(a):/em/.test(a)?parseFloat(a)*12:12;c=a<24?a+3:A(a*
1.2);d=A(c*0.8);return{h:c,b:d,f:a}},rotCorr:function(a,b,c){var d=a;b&&c&&(d=t(d*U(b*ga),4));return{x:-a/3*$(b*ga),y:d}},label:function(a,b,c,d,e,f,g,h,i){var k=this,j=k.g(i),l=k.text("",0,0,g).attr({zIndex:1}),m,n,r=0,s=3,p=0,v,x,w,t,ba=0,gb={},B,y,Bb,F,E;Bb=function(){var a,b;a=l.element.style;n=(v===void 0||x===void 0||j.styles.textAlign)&&q(l.textStr)&&l.getBBox();j.width=(v||n.width||0)+2*s+p;j.height=(x||n.height||0)+2*s;B=s+k.fontMetrics(a&&a.fontSize,l).b;if(y){if(!m)a=ba,b=(h?-B:0)+ba,j.box=
m=d?k.symbol(d,a,b,j.width,j.height,gb):k.rect(a,b,j.width,j.height,0,gb["stroke-width"]),m.isImg||m.attr("fill","none"),m.add(j);m.isImg||m.attr(u({width:A(j.width),height:A(j.height)},gb));gb=null}};F=function(){var a=j.styles,a=a&&a.textAlign,b=p+s,c;c=h?0:B;if(q(v)&&n&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(v-n.width);if(b!==l.x||c!==l.y)l.attr("x",b),c!==z&&l.attr("y",c);l.x=b;l.y=c};E=function(a,b){m?m.attr(a,b):gb[a]=b};j.onAdd=function(){l.add(j);j.attr({text:a||a===0?a:"",
x:b,y:c});m&&q(e)&&j.attr({anchorX:e,anchorY:f})};j.widthSetter=function(a){v=a};j.heightSetter=function(a){x=a};j.paddingSetter=function(a){if(q(a)&&a!==s)s=j.padding=a,F()};j.paddingLeftSetter=function(a){q(a)&&a!==p&&(p=a,F())};j.alignSetter=function(a){a={left:0,center:0.5,right:1}[a];a!==r&&(r=a,n&&j.attr({x:b}))};j.textSetter=function(a){a!==z&&l.textSetter(a);Bb();F()};j["stroke-widthSetter"]=function(a,b){a&&(y=!0);ba=a%2/2;E(b,a)};j.strokeSetter=j.fillSetter=j.rSetter=function(a,b){b==="fill"&&
a&&(y=!0);E(b,a)};j.anchorXSetter=function(a,b){e=a;E(b,A(a)-ba-w)};j.anchorYSetter=function(a,b){f=a;E(b,a-t)};j.xSetter=function(a){j.x=a;r&&(a-=r*((v||n.width)+2*s));w=A(a);j.attr("translateX",w)};j.ySetter=function(a){t=j.y=A(a);j.attr("translateY",t)};var C=j.css;return u(j,{css:function(a){if(a){var b={},a=D(a);o(j.textProps,function(c){a[c]!==z&&(b[c]=a[c],delete a[c])});l.css(b)}return C.call(j,a)},getBBox:function(){return{width:n.width+2*s,height:n.height+2*s,x:n.x-s,y:n.y-s}},shadow:function(a){m&&
m.shadow(a);return j},destroy:function(){V(j.element,"mouseenter");V(j.element,"mouseleave");l&&(l=l.destroy());m&&(m=m.destroy());O.prototype.destroy.call(j);j=k=Bb=F=E=null}})}};cb=Ca;u(O.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();if(a&&a.textOverflow==="ellipsis")a.whiteSpace="nowrap",a.overflow="hidden";this.styles=u(this.styles,a);L(this.element,a);return this},htmlGetBBox:function(){var a=this.element;
if(a.nodeName==="text")a.style.position="absolute";return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows,k=this.styles;L(b,{marginLeft:c,marginTop:d});i&&o(i,function(a){L(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&o(b.childNodes,function(c){a.invertChild(c,
b)});if(b.tagName==="SPAN"){var i=this.rotation,j=C(this.textWidth),l=k&&k.whiteSpace,m=[i,g,b.innerHTML,this.textWidth,this.textAlign].join(",");if(m!==this.cTT){k=a.fontMetrics(b.style.fontSize).b;q(i)&&this.setSpanRotation(i,h,k);if(b.offsetWidth>j&&/[ \-]/.test(b.textContent||b.innerText))L(b,{width:j+"px",display:"block",whiteSpace:l||"normal"}),this.hasTextWidth=!0;else if(this.hasTextWidth)L(b,{width:"",display:"",whiteSpace:l||"nowrap"}),this.hasTextWidth=!1;this.getSpanCorrection(this.hasTextWidth?
j:b.offsetWidth,k,h,i,g)}L(b,{left:e+(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(mb)k=b.offsetHeight;this.cTT=m}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var d={},e=ya?"-ms-transform":mb?"-webkit-transform":Ma?"MozTransform":Lb?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Ma?"Origin":"-origin")]=d.transformOrigin=b*100+"% "+c+"px";L(this.element,d)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});u(Ca.prototype,{html:function(a,b,c){var d=
this.createElement("span"),e=d.element,f=d.renderer,g=function(a,b){o(["opacity","visibility"],function(c){fb(a,c+"Setter",function(a,c,d,e){a.call(this,c,d,e);b[d]=c})})};d.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a;d.htmlUpdateTransform()};g(d,d.element.style);d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,b){b==="align"&&(b="textAlign");d[b]=a;d.htmlUpdateTransform()};d.attr({text:a,x:A(b),y:A(c)}).css({position:"absolute",fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize});e.style.whiteSpace="nowrap";d.css=d.htmlCss;if(f.isSVG)d.add=function(a){var b,c=f.box.parentNode,j=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)j.push(a),a=a.parentGroup;o(j.reverse(),function(a){var d,e=K(a.element,"class");e&&(e={className:e});b=a.div=a.div||Z(La,e,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;u(a,{translateXSetter:function(b,c){d.left=b+"px";a[c]=b;a.doTransform=!0},translateYSetter:function(b,c){d.top=
b+"px";a[c]=b;a.doTransform=!0}});g(a,d)})}}else b=c;b.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d};return d}});var J;if(!ca&&!ha){J={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===La;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=Z(c);this.renderer=a},add:function(a){var b=
this.renderer,c=this.element,d=b.box,e=a&&a.inverted,d=a?a.element||a:d;if(a)this.parentGroup=a;e&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();return this},updateTransform:O.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=U(a*ga),c=$(a*ga);L(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):
"none"})},getSpanCorrection:function(a,b,c,d,e){var f=d?U(d*ga):1,g=d?$(d*ga):0,h=p(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=h*c*(g<0?-1:1)),L(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)if(ma(a[b]))c[b]=A(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+
5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);return c.join(" ")||"x"},clip:function(a){var b=this,c;a?(c=a.members,oa(c,b),c.push(b),b.destroyClip=function(){oa(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:lb?"inherit":"rect(auto)"});return b.css(a)},css:O.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Ta(a)},destroy:function(){this.destroyClip&&this.destroyClip();return O.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+
a]=function(){var a=E.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=C(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,k,j=f.path,l,m,n,r;j&&typeof j.value!=="string"&&(j="x");m=j;if(a){n=p(a.width,3);r=(a.opacity||0.15)/n;for(e=1;e<=3;e++){l=n*2+1-2*e;c&&(m=this.cutOffPath(j.value,l+0.5));k=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',
m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=Z(g.prepVML(k),null,{left:C(i.left)+p(a.offsetX,1),top:C(i.top)+p(a.offsetY,1)});if(c)h.cutOff=l+1;k=['<stroke color="',a.color||"black",'" opacity="',r*e,'"/>'];Z(g.prepVML(k),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this},updateShadows:Aa,setAttr:function(a,b){lb?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){this.element.className=a},dashstyleSetter:function(a,
b,c){(c.getElementsByTagName("stroke")[0]||Z(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var d=this.shadows,a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?this.cutOffPath(a,d[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;if(d==="SPAN")c.style.color=a;else if(d!=="IMG")c.filled=a!=="none",this.setAttr("fillcolor",this.renderer.color(a,c,b,this))},"fill-opacitySetter":function(a,
b,c){Z(this.renderer.prepVML(["<",b.split("-")[0],' opacity="',a,'"/>']),null,null,c)},opacitySetter:Aa,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-A($(a*ga)+1)+"px";c.top=A(U(a*ga))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;ma(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){a==="inherit"&&
(a="visible");this.shadows&&o(this.shadows,function(c){c.style[b]=a});c.nodeName==="DIV"&&(a=a==="hidden"?"-999em":0,lb||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;b==="x"?b="left":b==="y"&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}};J["stroke-opacitySetter"]=J["fill-opacitySetter"];B.VMLElement=J=pa(O,J);J.prototype.ySetter=J.prototype.widthSetter=J.prototype.heightSetter=
J.prototype.xSetter;var Cb={Element:J,isIE8:za.indexOf("MSIE 8.0")>-1,init:function(a,b,c,d){var e;this.alignedObjects=[];d=this.createElement(La).css(u(this.getStyle(d),{position:"relative"}));e=d.element;a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!y.namespaces.hcv){y.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{y.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(f){y.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=Y(a);return u(e,{members:[],count:0,left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+A(a?e:d)+"px,"+
A(a?f:b)+"px,"+A(a?b:f)+"px,"+A(a?d:e)+"px)"};!a&&lb&&c==="DIV"&&u(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){o(e.members,function(a){a.element&&a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,k="none";a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var j,l,m=a.linearGradient||a.radialGradient,n,r,s,p,v,x="",a=a.stops,w,q=[],ba=function(){h=['<fill colors="'+q.join(",")+'" opacity="',s,'" o:opacity2="',r,'" type="',i,'" ',
x,'focus="100%" method="any" />'];Z(e.prepVML(h),null,null,b)};n=a[0];w=a[a.length-1];n[0]>0&&a.unshift([0,n[1]]);w[0]<1&&a.push([1,w[1]]);o(a,function(a,b){g.test(a[1])?(f=ia(a[1]),j=f.get("rgb"),l=f.get("a")):(j=a[1],l=1);q.push(a[0]*100+"% "+j);b?(s=l,p=j):(r=l,v=j)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,n=m.x2||m[2]||0,m=m.y2||m[3]||0,x='angle="'+(90-W.atan((m-a)/(n-c))*180/ra)+'"',ba();else{var k=m.r,t=k*2,u=k*2,A=m.cx,B=m.cy,z=b.radialReference,y,k=function(){z&&(y=
d.getBBox(),A+=(z[0]-y.x)/y.width-0.5,B+=(z[1]-y.y)/y.height-0.5,t*=z[2]/y.width,u*=z[2]/y.height);x='src="'+N.global.VMLRadialGradientURL+'" size="'+t+","+u+'" origin="0.5,0.5" position="'+A+","+B+'" color2="'+v+'" ';ba()};d.added?k():d.onAdd=k;k=p}else k=j}else if(g.test(a)&&b.tagName!=="IMG")f=ia(a),d[c+"-opacitySetter"](f.get("a"),c,b),k=f.get("rgb");else{k=b.getElementsByTagName(c);if(k.length)k[0].opacity=1,k[0].type="solid";k=a}return k},prepVML:function(a){var b=this.isIE8,a=a.join("");b?
(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:Ca.prototype.html,path:function(a){var b={coordsize:"10 10"};Ia(a)?b.d=a:Y(a)&&u(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");if(Y(a))c=a.r,b=a.y,a=a.x;d.isCircle=
!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(La).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},createElement:function(a){return a==="rect"?this.symbol(a):Ca.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this,d=b.style,e=a.tagName==="IMG"&&a.style;L(a,{flip:"x",left:C(d.width)-(e?C(e.top):
1),top:C(d.height)-(e?C(e.left):1),rotation:-90});o(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=U(f),i=$(f),k=U(g),j=$(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*k,b+h*j];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*k,b+c*j,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,
b+d/2,"e"]},rect:function(a,b,c,d,e){return Ca.prototype.symbols[!q(e)||!e.r?"square":"callout"].call(0,a,b,c,d,e)}}};B.VMLRenderer=J=function(){this.init.apply(this,arguments)};J.prototype=D(Ca.prototype,Cb);cb=J}Ca.prototype.measureSpanWidth=function(a,b){var c=y.createElement("span"),d;d=y.createTextNode(a);c.appendChild(d);L(c,b);this.box.appendChild(c);d=c.offsetWidth;Ta(c);return d};var Ob;if(ha)B.CanVGRenderer=J=function(){Fa="http://www.w3.org/1999/xhtml"},J.prototype.symbols={},Ob=function(){function a(){var a=
b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){if(b.length===0){var e=y.getElementsByTagName("head")[0],f=y.createElement("script");f.type="text/javascript";f.src=d;f.onload=a;e.appendChild(f)}b.push(c)}}}(),cb=J;Va.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.categories,e=a.names,f=this.pos,g=b.labels,h=a.tickPositions,i=f===h[0],k=f===h[h.length-1],e=d?p(d[f],e[f],f):f,d=this.label,h=h.info,j;a.isDatetimeAxis&&h&&(j=b.dateTimeLabelFormats[h.higherRanks[f]||
h.unitName]);this.isFirst=i;this.isLast=k;b=a.labelFormatter.call({axis:a,chart:c,isFirst:i,isLast:k,dateTimeLabelFormat:j,value:a.isLog?fa(na(e)):e});q(d)?d&&d.attr({text:b}):(this.labelLength=(this.label=d=q(b)&&g.enabled?c.renderer.text(b,0,0,g.useHTML).css(D(g.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var b=this.axis,c=a.x,d=b.chart.chartWidth,
e=b.chart.spacing,f=p(b.labelLeft,F(b.pos,e[3])),e=p(b.labelRight,t(b.pos+b.len,d-e[1])),g=this.label,h=this.rotation,i={left:0,center:0.5,right:1}[b.labelAlign],k=g.getBBox().width,j=b.slotWidth,l=1,m,n={};if(h)h<0&&c-i*k<f?m=A(c/U(h*ga)-f):h>0&&c+i*k>e&&(m=A((d-c)/U(h*ga)));else if(d=c+(1-i)*k,c-i*k<f?j=a.x+j*(1-i)-f:d>e&&(j=e-a.x+j*i,l=-1),j=F(b.slotWidth,j),j<b.slotWidth&&b.labelAlign==="center"&&(a.x+=l*(b.slotWidth-j-i*(b.slotWidth-F(k,j)))),k>j||b.autoRotation&&g.styles.width)m=j;if(m){n.width=
m;if(!b.options.labels.style.textOverflow)n.textOverflow="ellipsis";g.css(n)}},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,g,h){var i=this.axis,k=i.transA,j=i.reversed,l=i.staggerLines,m=i.tickRotCorr||
{x:0,y:0},n=e.y;q(n)||(n=i.side===2?m.y+8:n=U(c.rotation*ga)*(m.y-c.getBBox(!1,0).height/2));a=a+e.x+m.x-(f&&d?f*k*(j?-1:1):0);b=b+n-(f&&!d?f*k*(j?1:-1):0);l&&(c=g/(h||1)%l,i.opposite&&(c=l-c-1),b+=c*(i.labelOffset/l));return{x:a,y:A(b)}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,k=this.pos,j=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",n=h?h+"Tick":
"tick",r=e[m+"LineWidth"],s=e[m+"LineColor"],o=e[m+"LineDashStyle"],v=e[n+"Length"],m=p(e[n+"Width"],!h&&d.isXAxis?1:0),x=e[n+"Color"],w=e[n+"Position"],n=this.mark,q=j.step,ba=!0,t=d.tickmarkOffset,u=this.getPosition(g,k,t,b),A=u.x,u=u.y,B=g&&A===d.pos+d.len||!g&&u===d.pos?-1:1,c=p(c,1);this.isActive=!0;if(r){k=d.getPlotLinePath(k+t,r*B,b,!0);if(l===z){l={stroke:s,"stroke-width":r};if(o)l.dashstyle=o;if(!h)l.zIndex=1;if(b)l.opacity=0;this.gridLine=l=r?f.path(k).attr(l).add(d.gridGroup):null}if(!b&&
l&&k)l[this.isNew?"attr":"animate"]({d:k,opacity:c})}if(m&&v)w==="inside"&&(v=-v),d.opposite&&(v=-v),h=this.getMarkPath(A,u,v,m*B,g,f),n?n.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:x,"stroke-width":m,opacity:c}).add(d.axisGroup);if(i&&!isNaN(A))i.xy=u=this.getLabelPosition(A,u,i,g,j,t,a,q),this.isFirst&&!this.isLast&&!p(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!p(e.showLastLabel,1)?ba=!1:g&&!d.isRadial&&!j.step&&!j.rotation&&!b&&c!==0&&this.handleOverflow(u),q&&a%q&&(ba=!1),
ba&&!isNaN(u.y)?(u.opacity=c,i[this.isNew?"attr":"animate"](u),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Sa(this,this.axis)}};B.PlotLineOrBand=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id};B.PlotLineOrBand.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=a.options,e=d.label,f=a.label,g=d.width,h=d.to,i=d.from,k=q(i)&&q(h),j=d.value,l=d.dashStyle,m=a.svgElem,n=[],r,s=d.color,o=p(d.zIndex,0),v=d.events,x={},w=b.chart.renderer;b.isLog&&(i=Da(i),h=Da(h),j=Da(j));if(g){if(n=
b.getPlotLinePath(j,g),x={stroke:s,"stroke-width":g},l)x.dashstyle=l}else if(k){n=b.getPlotBandPath(i,h,d);if(s)x.fill=s;if(d.borderWidth)x.stroke=d.borderColor,x["stroke-width"]=d.borderWidth}else return;x.zIndex=o;if(m)if(n)m.show(),m.animate({d:n});else{if(m.hide(),f)a.label=f=f.destroy()}else if(n&&n.length&&(a.svgElem=m=w.path(n).attr(x).add(),v))for(r in d=function(b){m.on(b,function(c){v[b].apply(a,[c])})},v)d(r);e&&q(e.text)&&n&&n.length&&b.width>0&&b.height>0&&!n.flat?(e=D({align:c&&k&&"center",
x:c?!k&&4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},e),this.renderLabel(e,n,k,o)):f&&f.hide();return a},renderLabel:function(a,b,c,d){var e=this.label,f=this.axis.chart.renderer;if(!e)e={align:a.textAlign||a.align,rotation:a.rotation},e.zIndex=d,this.label=e=f.text(a.text,0,0,a.useHTML).attr(e).css(a.style).add();d=[b[1],b[4],c?b[6]:b[1]];b=[b[2],b[5],c?b[7]:b[2]];c=Ra(d);f=Ra(b);e.align(a,!1,{x:c,y:f,width:Ea(d)-c,height:Ea(b)-f});e.show()},destroy:function(){oa(this.axis.plotLinesAndBands,
this);delete this.axis;Sa(this)}};var ka=B.Axis=function(){this.init.apply(this,arguments)};ka.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#D8D8D8",labels:{enabled:!0,style:{color:"#606060",cursor:"default",fontSize:"11px"},x:0,y:15},lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,
minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#707070"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return B.numberFormat(this.total,
-1)},style:D(aa.line.dataLabels.style,{color:"#000000"})}},defaultLeftAxisOptions:{labels:{x:-15,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0,y:null},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0,y:-15},title:{rotation:0}},init:function(a,b){var c=b.isX;this.chart=a;this.horiz=a.inverted?!c:c;this.coll=(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=b.opposite;this.side=
b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=d.reversed;this.visible=d.visible!==!1;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=this.names||[];this.isLog=e==="logarithmic";this.isDatetimeAxis=e==="datetime";this.isLinked=q(d.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks=
{};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=p(d.crosshair,ta(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;sa(this,a.axes)===-1&&(c&&!this.isColorAxis?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];if(a.inverted&&
c&&this.reversed===z)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)M(this,f,d[f]);if(this.isLog)this.val2lin=Da,this.lin2val=na},setOptions:function(a){this.options=D(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],D(N[this.coll],a))},defaultLabelFormatter:function(){var a=this.axis,b=this.value,c=a.categories,d=
this.dateTimeLabelFormat,e=N.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Ka(h,this);else if(c)g=b;else if(d)g=Qa(d,b);else if(f&&a>=1E3)for(;f--&&g===z;)c=Math.pow(1E3,f+1),a>=c&&b*10%c===0&&e[f]!==null&&(g=B.numberFormat(b/c,-1)+e[f]);g===z&&(g=P(b)>=1E4?B.numberFormat(b,-1):B.numberFormat(b,-1,z,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;
a.buildStacks&&a.buildStacks();o(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d=c.options,e=d.threshold,f;a.hasVisibleSeries=!0;a.isLog&&e<=0&&(e=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=F(p(a.dataMin,d[0]),Ra(d)),a.dataMax=t(p(a.dataMax,d[0]),Ea(d))}else{c.getExtremes();f=c.dataMax;c=c.dataMin;if(q(c)&&q(f))a.dataMin=F(p(a.dataMin,c),c),a.dataMax=t(p(a.dataMax,f),f);if(q(e))a.threshold=e;if(!d.softThreshold||a.isLog)a.softThreshold=!1}}})},translate:function(a,
b,c,d,e,f){var g=this.linkedParent||this,h=1,i=0,k=d?g.oldTransA:g.transA,d=d?g.oldMin:g.min,j=g.minPixelPadding,e=(g.isOrdinal||g.isBroken||g.isLog&&e)&&g.lin2val;if(!k)k=g.transA;if(c)h*=-1,i=g.len;g.reversed&&(h*=-1,i-=h*(g.sector||g.len));b?(a=a*h+i,a-=j,a=a/k+d,e&&(a=g.lin2val(a))):(e&&(a=g.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*k+i+h*j+(ma(f)?k*f*g.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-
(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,k,j=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||f.chartWidth,m;i=this.transB;var n=function(a,b,c){if(a<b||a>c)d?a=F(t(b,a),c):m=!0;return a},e=p(e,this.translate(a,null,null,c)),a=c=A(e+i);i=k=A(j-e-i);isNaN(e)?m=!0:this.horiz?(i=h,k=j-this.bottom,a=c=n(a,g,g+this.width)):(a=g,c=l-this.right,i=k=n(i,h,h+this.height));return m&&!d?null:f.renderer.crispLine(["M",a,i,"L",
c,k],b||1)},getLinearTickPositions:function(a,b,c){var d,e=fa(T(b/a)*a),f=fa(ua(c/a)*a),g=[];if(b===c&&ma(b))return[b];for(b=e;b<=f;){g.push(b);b=fa(b+a);if(b===d)break;d=b}return g},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e,f=this.pointRangePadding||0;e=this.min-f;var f=this.max+f,g=f-e;if(g&&g/c<this.len/3)if(this.isLog){f=b.length;for(e=1;e<f;e++)d=d.concat(this.getLogTickPositions(c,b[e-1],b[e],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval===
"auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),e,f,a.startOfWeek));else for(b=e+(b[0]-e)%c;b<=f;b+=c)d.push(b);d.length!==0&&this.trimTicks(d,a.startOnTick,a.endOnTick);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,k,j;if(this.isXAxis&&this.minRange===z&&!this.isLog)q(a.min)||q(a.max)?this.minRange=null:(o(this.series,function(a){i=a.xData;for(g=k=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-
i[g-1],f===z||h<f)f=h}),this.minRange=F(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){j=this.minRange;d=(j-c+b)/2;d=[b-d,p(a.min,b-d)];if(e)d[2]=this.dataMin;b=Ea(d);c=[b+j,p(a.max,b+j)];if(e)c[2]=this.dataMax;c=Ra(c);c-b<j&&(d[0]=c-j,d[1]=p(a.min,c-j),b=Ea(d))}this.min=b;this.max=c},setAxisTranslation:function(a){var b=this,c=b.max-b.min,d=b.axisPointRange||0,e,f=0,g=0,h=b.linkedParent,i=!!b.categories,k=b.transA,j=b.isXAxis;if(j||i||d)if(h?(f=h.minPointOffset,g=h.pointRangePadding):(o(b.series,
function(a){var b=a.closestPointRange;!a.noSharedTooltip&&q(b)&&(e=q(e)?F(e,b):b)}),o(b.series,function(a){var c=i?1:j?p(a.options.pointRange,e,0):b.axisPointRange||0,a=a.options.pointPlacement;d=t(d,c);b.single||(f=t(f,xa(a)?0:c/2),g=t(g,a==="on"?0:c))})),h=b.ordinalSlope&&e?b.ordinalSlope/e:1,b.minPointOffset=f*=h,b.pointRangePadding=g*=h,b.pointRange=F(d,c),j)b.closestPointRange=e;if(a)b.oldTransA=k;b.translationSlope=b.transA=k=b.len/(c+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=
k*f},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=d.maxPadding,k=d.minPadding,j=d.tickInterval,l=d.tickPixelInterval,m=b.categories,n=b.threshold,r=b.softThreshold,s,R,v,x;!f&&!m&&!h&&this.getTickAmount();v=p(b.userMin,d.min);x=p(b.userMax,d.max);h?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=p(c.min,c.dataMin),b.max=p(c.max,c.dataMax),d.type!==
b.linkedParent.options.type&&X(11,1)):(!r&&q(n)&&(b.dataMin>=n?(s=n,k=0):b.dataMax<=n&&(R=n,i=0)),b.min=p(v,s,b.dataMin),b.max=p(x,R,b.dataMax));if(e)!a&&F(b.min,p(b.dataMin,b.min))<=0&&X(10,1),b.min=fa(Da(b.min),15),b.max=fa(Da(b.max),15);if(b.range&&q(b.max))b.userMin=b.min=v=t(b.min,b.minFromRange()),b.userMax=x=b.max,b.range=null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!m&&!b.axisPointRange&&!b.usePercentage&&!h&&q(b.min)&&q(b.max)&&(c=b.max-b.min))!q(v)&&k&&(b.min-=c*k),!q(x)&&
i&&(b.max+=c*i);if(ma(d.floor))b.min=t(b.min,d.floor);if(ma(d.ceiling))b.max=F(b.max,d.ceiling);if(r&&q(b.dataMin))if(n=n||0,!q(v)&&b.min<n&&b.dataMin>=n)b.min=n;else if(!q(x)&&b.max>n&&b.dataMax<=n)b.max=n;b.tickInterval=b.min===b.max||b.min===void 0||b.max===void 0?1:h&&!j&&l===b.linkedParent.options.tickPixelInterval?j=b.linkedParent.tickInterval:p(j,this.tickAmount?(b.max-b.min)/t(this.tickAmount-1,1):void 0,m?1:(b.max-b.min)*l/t(b.len,l));g&&!a&&o(b.series,function(a){a.processData(b.min!==b.oldMin||
b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange&&!j)b.tickInterval=t(b.pointRange,b.tickInterval);a=p(d.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);if(!j&&b.tickInterval<a)b.tickInterval=a;if(!f&&!e&&!j)b.tickInterval=sb(b.tickInterval,null,rb(b.tickInterval),p(d.allowDecimals,!(b.tickInterval>0.5&&b.tickInterval<5&&b.max>1E3&&b.max<9999)),
!!this.tickAmount);if(!this.tickAmount&&this.len)b.tickInterval=b.unsquish();this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,d=a.tickPositioner,e=a.startOnTick,f=a.endOnTick,g;this.tickmarkOffset=this.categories&&a.tickmarkPlacement==="between"&&this.tickInterval===1?0.5:0;this.minorTickInterval=a.minorTickInterval==="auto"&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();if(!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,d&&(d=d.apply(this,[this.min,this.max]))))this.tickPositions=b=d;if(!this.isLinked)this.trimTicks(b,e,f),this.min===this.max&&q(this.min)&&!this.tickAmount&&(g=!0,this.min-=0.5,this.max+=0.5),this.single=g,!c&&!d&&
this.adjustTickAmount()},trimTicks:function(a,b,c){var d=a[0],e=a[a.length-1],f=this.minPointOffset||0;if(b)this.min=d;else for(;this.min-f>a[0];)a.shift();if(c)this.max=e;else for(;this.max+f<a[a.length-1];)a.pop();a.length===0&&q(d)&&a.push((e+d)/2)},alignToOthers:function(){var a={},b,c=this.options;this.chart.options.chart.alignTicks!==!1&&c.alignTicks!==!1&&o(this.chart[this.coll],function(c){var e=c.options,e=[c.horiz?e.left:e.top,e.width,e.height,e.pane].join(",");c.series.length&&(a[e]?b=
!0:a[e]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!q(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=ua(this.len/c)+1);if(b<4)this.finalTickAmt=b,b=5;this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,d=this.finalTickAmt,e=b&&b.length;if(e<c){for(;b.length<c;)b.push(fa(b[b.length-1]+a));this.transA*=(e-1)/(c-1);this.max=
b[b.length-1]}else e>c&&(this.tickInterval*=2,this.setTickPositions());if(q(d)){for(a=c=b.length;a--;)(d===3&&a%2===1||d<=2&&a>0&&a<c-1)&&b.splice(a,1);this.finalTickAmt=z}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;o(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});if(b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||
this.alignToOthers()){if(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,!this.isDirty)this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax}else this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=p(c,!0);o(f.series,function(a){delete a.kdTree});e=u(e,{min:a,max:b});H(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;
c&&g.redraw(d)})},zoom:function(a,b){var c=this.dataMin,d=this.dataMax,e=this.options,f=F(c,p(e.min,c)),e=t(d,p(e.max,d));this.allowZoomOutside||(q(c)&&a<=f&&(a=f),q(d)&&b>=e&&(b=e));this.displayBtn=a!==z||b!==z;this.setExtremes(a,b,!1,z,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=this.horiz,e=p(b.width,a.plotWidth-c+(b.offsetRight||0)),f=p(b.height,a.plotHeight),g=p(b.top,a.plotTop),b=p(b.left,a.plotLeft+c),c=/%$/;c.test(f)&&(f=Math.round(parseFloat(f)/
100*a.plotHeight));c.test(g)&&(g=Math.round(parseFloat(g)/100*a.plotHeight+a.plotTop));this.left=b;this.top=g;this.width=e;this.height=f;this.bottom=a.chartHeight-f-g;this.right=a.chartWidth-e-b;this.len=t(d?e:f,0);this.pos=d?b:g},getExtremes:function(){var a=this.isLog;return{min:a?fa(na(this.min)):this.min,max:a?fa(na(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?na(this.min):this.min,b=b?na(this.max):
this.max;a===null?a=b<0?b:c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(p(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},unsquish:function(){var a=this.ticks,b=this.options.labels,c=this.horiz,d=this.tickInterval,e=d,f=this.len/(((this.categories?1:0)+this.max-this.min)/d),g,h=b.rotation,i=this.chart.renderer.fontMetrics(b.style.fontSize,a[0]&&a[0].label),k,j=Number.MAX_VALUE,l,m=function(a){a/=f||1;a=a>1?ua(a):1;return a*
d};c?(l=!b.staggerLines&&!b.step&&(q(h)?[h]:f<p(b.autoRotationLimit,80)&&b.autoRotation))&&o(l,function(a){var b;if(a===h||a&&a>=-90&&a<=90)k=m(P(i.h/$(ga*a))),b=k+P(a/360),b<j&&(j=b,g=a,e=k)}):b.step||(e=m(i.h));this.autoRotation=l;this.labelRotation=p(g,h);return e},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,d=this.ticks,e=this.options.labels,f=this.horiz,g=a.margin,h=this.categories?c.length:c.length-1,g=this.slotWidth=f&&(e.step||0)<2&&!e.rotation&&(this.staggerLines||
1)*a.plotWidth/h||!f&&(g[3]&&g[3]-a.spacing[3]||a.chartWidth*0.33),i=t(1,A(g-2*(e.padding||5))),k={},h=b.fontMetrics(e.style.fontSize,d[0]&&d[0].label),j=e.style.textOverflow,l,m=0,n,r;if(!xa(e.rotation))k.rotation=e.rotation||0;if(this.autoRotation)o(c,function(a){if((a=d[a])&&a.labelLength>m)m=a.labelLength}),m>i&&m>h.h?k.rotation=this.labelRotation:this.labelRotation=0;else if(g&&(l={width:i+"px"},!j)){l.textOverflow="clip";for(n=c.length;!f&&n--;)if(r=c[n],i=d[r].label)if(i.styles.textOverflow===
"ellipsis"&&i.css({textOverflow:"clip"}),i.getBBox().height>this.len/c.length-(h.h-h.f)||d[r].labelLength>g)i.specCss={textOverflow:"ellipsis"}}if(k.rotation&&(l={width:(m>a.chartHeight*0.5?a.chartHeight*0.33:a.chartHeight)+"px"},!j))l.textOverflow="ellipsis";if(this.labelAlign=e.align||this.autoLabelAlign(this.labelRotation))k.align=this.labelAlign;o(c,function(a){var b=(a=d[a])&&a.label;if(b)b.attr(k),l&&b.css(D(l,b.specCss)),delete b.specCss,a.rotation=k.rotation});this.tickRotCorr=b.rotCorr(h.b,
this.labelRotation||0,this.side!==0)},hasData:function(){return this.hasVisibleSeries||q(this.min)&&q(this.max)&&!!this.tickPositions},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,k,j,l=0,m,n=0,r=d.title,s=d.labels,R=0,v=a.opposite,x=b.axisOffset,b=b.clipOffset,w=[-1,1,1,-1][h],u,ba=a.axisParent;k=a.hasData();a.showAxis=j=k||p(d.showEmpty,!0);a.staggerLines=a.horiz&&s.staggerLines;if(!a.axisGroup)a.gridGroup=
c.g("grid").attr({zIndex:d.gridZIndex||1}).add(ba),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(ba),a.labelGroup=c.g("axis-labels").attr({zIndex:s.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels").add(ba);if(k||a.isLinked){if(o(e,function(b){f[b]?f[b].addLabel():f[b]=new Va(a,b)}),a.renderUnsquish(),s.reserveSpace!==!1&&(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign||a.labelAlign==="center")&&o(e,function(a){R=t(f[a].getLabelSize(),R)}),a.staggerLines)R*=a.staggerLines,
a.labelOffset=R*(a.opposite?-1:1)}else for(u in f)f[u].destroy(),delete f[u];if(r&&r.text&&r.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(r.text,0,0,r.useHTML).attr({zIndex:7,rotation:r.rotation||0,align:r.textAlign||{low:v?"right":"left",middle:"center",high:v?"left":"right"}[r.align]}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(r.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(j)l=a.axisTitle.getBBox()[g?"height":"width"],m=r.offset,n=q(m)?0:p(r.margin,g?5:10);a.axisTitle[j?
"show":"hide"](!0)}a.offset=w*p(d.offset,x[h]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=h===2?a.tickRotCorr.y:0;g=Math.abs(R)+n+(R&&w*(g?p(s.y,a.tickRotCorr.y+8):s.x)-c);a.axisTitleMargin=p(m,g);x[h]=t(x[h],a.axisTitleMargin+l+w*a.offset,g);d=d.offset?0:T(d.lineWidth/2)*2;b[i]=t(b[i],d)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:
f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=e.x||0,k=e.y||0,j=C(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?j:0);return{x:a?d+i:b+(g?this.width:0)+h+i,y:a?b+k-(g?this.height:0)+h:d+k}},render:function(){var a=this,
b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,g=a.tickPositions,h=a.axisTitle,i=a.ticks,k=a.minorTicks,j=a.alternateBands,l=d.stackLabels,m=d.alternateGridColor,n=a.tickmarkOffset,r=d.lineWidth,s,p=b.hasRendered&&q(a.oldMin)&&!isNaN(a.oldMin),v=a.showAxis,x=c.globalAnimation,w,t;a.labelEdge.length=0;a.overlap=!1;o([i,k,j],function(a){for(var b in a)a[b].isActive=!1});if(a.hasData()||f){a.minorTickInterval&&!a.categories&&o(a.getMinorTickPositions(),function(b){k[b]||(k[b]=new Va(a,b,"minor"));
p&&k[b].isNew&&k[b].render(null,!0);k[b].render(null,!1,1)});if(g.length&&(o(g,function(b,c){if(!f||b>=a.min&&b<=a.max)i[b]||(i[b]=new Va(a,b)),p&&i[b].isNew&&i[b].render(c,!0,0.1),i[b].render(c)}),n&&(a.min===0||a.single)))i[-1]||(i[-1]=new Va(a,-1,null,!0)),i[-1].render(-1);m&&o(g,function(c,d){t=g[d+1]!==z?g[d+1]+n:a.max-n;if(d%2===0&&c<a.max&&t<=a.max+(b.polar?-n:n))j[c]||(j[c]=new B.PlotLineOrBand(a)),w=c+n,j[c].options={from:e?na(w):w,to:e?na(t):t,color:m},j[c].render(),j[c].isActive=!0});if(!a._addedPlotLB)o((d.plotLines||
[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0}o([i,k,j],function(a){var c,d,e=[],f=x?x.duration||500:0;for(c in a)if(!a[c].isActive)a[c].render(c,!1,0),a[c].isActive=!1,e.push(c);Pa(function(){for(d=e.length;d--;)a[e[d]]&&!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]])},a===j||!b.hasRendered||!f?0:f)});if(r)s=a.getLinePath(r),a.axisLine?a.axisLine.animate({d:s}):a.axisLine=c.path(s).attr({stroke:d.lineColor,"stroke-width":r,zIndex:7}).add(a.axisGroup),a.axisLine[v?
"show":"hide"](!0);if(h&&v)h[h.isNew?"attr":"animate"](a.getTitlePosition()),h.isNew=!1;l&&l.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),o(this.plotLinesAndBands,function(a){a.render()}));o(this.series,function(a){a.isDirty=!0})},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||V(b);for(d in c)Sa(c[d]),c[d]=null;o([b.ticks,b.minorTicks,b.alternateBands],function(a){Sa(a)});for(a=e.length;a--;)e[a].destroy();o("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),
function(a){b[a]&&(b[a]=b[a].destroy())});this.cross&&this.cross.destroy()},drawCrosshair:function(a,b){var c,d=this.crosshair,e,f;if(!this.crosshair||(q(b)||!p(d.snap,!0))===!1)this.hideCrosshair();else if(p(d.snap,!0)?q(b)&&(c=this.isXAxis?b.plotX:this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos,c=this.isRadial?this.getPlotLinePath(this.isXAxis?b.x:p(b.stackY,b.y))||null:this.getPlotLinePath(null,null,null,null,c)||null,c===null)this.hideCrosshair();else if(e=this.categories&&
!this.isRadial,f=p(d.width,e?this.transA:1),this.cross)this.cross.attr({d:c,visibility:"visible","stroke-width":f});else{e={"stroke-width":f,stroke:d.color||(e?"rgba(155,200,255,0.2)":"#C0C0C0"),zIndex:p(d.zIndex,2)};if(d.dashStyle)e.dashstyle=d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add()}},hideCrosshair:function(){this.cross&&this.cross.hide()}};u(ka.prototype,{getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b,null,null,!0),d=this.getPlotLinePath(a,null,null,!0);d&&c?
(d.flat=d.toString()===c.toString(),d.push(c[4],c[5],c[1],c[2])):d=null;return d},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new B.PlotLineOrBand(this,a)).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||[],d[b].push(a)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===
a&&b[e].destroy();o([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&oa(b,b[e])})}});ka.prototype.getTimeTicks=function(a,b,c,d){var e=[],f={},g=N.global.useUTC,h,i=new qa(b-Ya(b)),k=a.unitRange,j=a.count;if(q(b)){i[Gb](k>=G.second?0:j*T(i.getMilliseconds()/j));if(k>=G.second)i[Hb](k>=G.minute?0:j*T(i.getSeconds()/j));if(k>=G.minute)i[Ib](k>=G.hour?0:j*T(i[tb]()/j));if(k>=G.hour)i[Jb](k>=G.day?0:j*T(i[ub]()/j));if(k>=G.day)i[wb](k>=G.month?
1:j*T(i[$a]()/j));k>=G.month&&(i[xb](k>=G.year?0:j*T(i[ab]()/j)),h=i[bb]());k>=G.year&&(h-=h%j,i[yb](h));if(k===G.week)i[wb](i[$a]()-i[vb]()+p(d,1));b=1;if(qb||Za)i=i.getTime(),i=new qa(i+Ya(i));h=i[bb]();for(var d=i.getTime(),l=i[ab](),m=i[$a](),n=!g||!!Za,r=(G.day+(g?Ya(i):i.getTimezoneOffset()*6E4))%G.day;d<c;)e.push(d),k===G.year?d=kb(h+b*j,0):k===G.month?d=kb(h,l+b*j):n&&(k===G.day||k===G.week)?d=kb(h,l,m+b*j*(k===G.day?1:7)):d+=k*j,b++;e.push(d);o(Na(e,function(a){return k<=G.hour&&a%G.day===
r}),function(a){f[a]="day"})}e.info=u(a,{higherRanks:f,totalRange:k*j});return e};ka.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=c[c.length-1],e=G[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=G[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+G[c[g+1][0]])/2)break;e===G.year&&a<5*e&&(f=[1,
2,5]);c=sb(a/e,f,d[0]==="year"?t(rb(a/e),1):1);return{unitRange:e,count:c,unitName:d[0]}};ka.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=A(a),g=this.getLinearTickPositions(a,b,c);else if(a>=0.08)for(var f=T(b),h,i,k,j,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)k=Da(na(f)*e[h]),k>b&&(!d||j<=c)&&j!==z&&g.push(j),j>c&&(l=!0),j=k}else if(b=na(b),c=na(c),a=e[d?
"minorTickInterval":"tickInterval"],a=p(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=sb(a,null,rb(a)),g=Ba(this.getLinearTickPositions(a,b,c),Da),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g};var Pb=B.Tooltip=function(){this.init.apply(this,arguments)};Pb.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=C(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=
!0;this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-9999});ha||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden&&(P(a-f.x)>1||
P(b-f.y)>1),h=e.followPointer||e.len>1;u(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:h?z:g?(2*f.anchorX+c)/3:c,anchorY:h?z:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g)clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32)},hide:function(a){var b=this;clearTimeout(this.hideTimer);a=p(a,this.options.hideDelay,500);if(!this.isHidden)this.hideTimer=Pa(function(){b.label[a?"fadeOut":"hide"]();b.isHidden=!0},a)},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,
f=d.plotTop,g=d.plotLeft,h=0,i=0,k,j,a=ta(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===z&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(o(a,function(a){k=a.series.yAxis;j=a.series.xAxis;h+=a.plotX+(!e&&j?j.left-g:0);i+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&k?k.top-f:0)}),h/=a.length,i/=a.length,c=[e?d.plotWidth-i:h,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-h:i]);return Ba(c,A)},getPosition:function(a,b,c){var d=this.chart,e=this.distance,
f={},g=c.h||0,h,i=["y",d.chartHeight,b,c.plotY+d.plotTop,d.plotTop,d.plotTop+d.plotHeight],k=["x",d.chartWidth,a,c.plotX+d.plotLeft,d.plotLeft,d.plotLeft+d.plotWidth],j=p(c.ttBelow,d.inverted&&!c.negative||!d.inverted&&c.negative),l=function(a,b,c,d,h,i){var k=c<d-e,l=d+e+c<b,m=d-e-c;d+=e;if(j&&l)f[a]=d;else if(!j&&k)f[a]=m;else if(k)f[a]=F(i-c,m-g<0?m:m-g);else if(l)f[a]=t(h,d+g+c>b?d:d+g);else return!1},m=function(a,b,c,d){var g;d<e||d>b-e?g=!1:f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2;return g},n=function(a){var b=
i;i=k;k=b;h=a},r=function(){l.apply(0,i)!==!1?m.apply(0,k)===!1&&!h&&(n(!0),r()):h?f.x=f.y=0:(n(!0),r())};(d.inverted||this.len>1)&&n();r();return f},defaultFormatter:function(a){var b=this.points||ta(this),c;c=[a.tooltipFooterHeaderFormatter(b[0])];c=c.concat(a.bodyFormatter(b));c.push(a.tooltipFooterHeaderFormatter(b[0],!0));return c.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h,i={},k,j=[];k=e.formatter||this.defaultFormatter;var i=c.hoverPoints,l,m=this.shared;
clearTimeout(this.hideTimer);this.followPointer=ta(a)[0].series.tooltipOptions.followPointer;h=this.getAnchor(a,b);f=h[0];g=h[1];m&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,i&&o(i,function(a){a.setState()}),o(a,function(a){a.setState("hover");j.push(a.getLabelConfig())}),i={x:a[0].category,y:a[0].y},i.points=j,this.len=j.length,a=a[0]):i=a.getLabelConfig();k=k.call(i,this);i=a.series;this.distance=p(i.tooltipOptions.distance,16);k===!1?this.hide():(this.isHidden&&(Oa(d),d.attr("opacity",
1).show()),d.attr({text:k}),l=e.borderColor||a.color||i.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:g,negative:a.negative,ttBelow:a.ttBelow,h:h[2]||0}),this.isHidden=!1);H(c,"tooltipRefresh",{text:k,x:f+c.plotLeft,y:g+c.plotTop,borderColor:l})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(A(c.x),A(c.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getXDateFormat:function(a,b,c){var d,
b=b.dateTimeLabelFormats,e=c&&c.closestPointRange,f,g={millisecond:15,second:12,minute:9,hour:6,day:3},h,i="millisecond";if(e){h=Qa("%m-%d %H:%M:%S.%L",a.x);for(f in G){if(e===G.week&&+Qa("%w",a.x)===c.options.startOfWeek&&h.substr(6)==="00:00:00.000"){f="week";break}if(G[f]>e){f=i;break}if(g[f]&&h.substr(g[f])!=="01-01 00:00:00.000".substr(g[f]))break;f!=="week"&&(i=f)}f&&(d=b[f])}else d=b.day;return d||b.year},tooltipFooterHeaderFormatter:function(a,b){var c=b?"footer":"header",d=a.series,e=d.tooltipOptions,
f=e.xDateFormat,g=d.xAxis,h=g&&g.options.type==="datetime"&&ma(a.key),c=e[c+"Format"];h&&!f&&(f=this.getXDateFormat(a,e,g));h&&f&&(c=c.replace("{point.key}","{point.key:"+f+"}"));return Ka(c,{point:a,series:d})},bodyFormatter:function(a){return Ba(a,function(a){var c=a.series.tooltipOptions;return(c.pointFormatter||a.point.tooltipFormatter).call(a.point,c.pointFormat)})}};var ea;db=y&&y.documentElement.ontouchstart!==z;var Xa=B.Pointer=function(a,b){this.init(a,b)};Xa.prototype={init:function(a,b){var c=
b.chart,d=c.events,e=ha?"":c.zoomType,c=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.hasZoom=f||e;this.runChartClick=d&&!!d.click;this.pinchDown=[];this.lastValidTouch={};if(B.Tooltip&&b.tooltip.enabled)a.tooltip=new Pb(a,b.tooltip),this.followTouchMove=p(b.tooltip.followTouchMove,!0);this.setDOMEvents()},normalize:function(a,b){var c,d,a=a||E.event;if(!a.target)a.target=a.srcElement;d=a.touches?
a.touches.length?a.touches.item(0):a.changedTouches[0]:a;if(!b)this.chartPosition=b=Ab(this.chart.container);d.pageX===z?(c=t(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-b.left,d=d.pageY-b.top);return u(a,{chartX:A(c),chartY:A(d)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};o(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e=d?d.shared:!1,f=b.hoverPoint,
g=b.hoverSeries,h=[Number.MAX_VALUE,Number.MAX_VALUE],i,k,j=[],l=[],m;if(!e&&!g)for(b=0;b<c.length;b++)if(c[b].directTouch||!c[b].options.stickyTracking)c=[];g&&(e?g.noSharedTooltip:g.directTouch)&&f?l=[f]:(o(c,function(b){i=b.noSharedTooltip&&e;k=!e&&b.directTouch;b.visible&&!i&&!k&&p(b.options.enableMouseTracking,!0)&&(m=b.searchPoint(a,!i&&b.kdDimensions===1))&&j.push(m)}),o(j,function(a){a&&o(["dist","distX"],function(b,c){typeof a[b]==="number"&&a[b]<h[c]&&(h[c]=a[b],l[c]=a)})}));if(e)for(b=
j.length;b--;)(j[b].clientX!==l[1].clientX||j[b].series.noSharedTooltip)&&j.splice(b,1);if(l[0]&&(l[0]!==this.prevKDPoint||d&&d.isHidden))if(e&&!l[0].series.noSharedTooltip)j.length&&d&&d.refresh(j,a),o(j,function(b){b.onMouseOver(a,b!==(g&&g.directTouch&&f||l[0]))}),this.prevKDPoint=l[1];else{d&&d.refresh(l[0],a);if(!g||!g.directTouch)l[0].onMouseOver(a);this.prevKDPoint=l[0]}else c=g&&g.tooltipOptions.followPointer,d&&c&&!d.isHidden&&(c=d.getAnchor([{}],a),d.updatePosition({plotX:c[0],plotY:c[1]}));
if(!this._onDocumentMouseMove)this._onDocumentMouseMove=function(a){if(S[ea])S[ea].pointer.onDocumentMouseMove(a)},M(y,"mousemove",this._onDocumentMouseMove);o(e?j:[p(l[1],f)],function(b){var c=b&&b.series;c&&o(["xAxis","yAxis","colorAxis"],function(d){c[d]&&c[d].drawCrosshair(a,b)})})},reset:function(a,b){var c=this.chart,d=c.hoverSeries,e=c.hoverPoint,f=c.hoverPoints,g=c.tooltip,h=g&&g.shared?f:e;(a=a&&g&&h)&&o(ta(h),function(b){b.plotX===void 0&&(a=!1)});if(a)g.refresh(h),e&&(e.setState(e.state,
!0),o(c.axes,function(a){p(a.options.crosshair&&a.options.crosshair.snap,!0)?a.drawCrosshair(null,e):a.hideCrosshair()}));else{if(e)e.onMouseOut();f&&o(f,function(a){a.setState()});if(d)d.onMouseOut();g&&g.hide(b);if(this._onDocumentMouseMove)V(y,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null;o(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,d;o(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&
e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,k=b.plotWidth,j=b.plotHeight,
l,m=this.selectionMarker,n=this.mouseDownX,r=this.mouseDownY,s=c.panKey&&a[c.panKey+"Key"];if(!m||!m.touch)if(d<h?d=h:d>h+k&&(d=h+k),e<i?e=i:e>i+j&&(e=i+j),this.hasDragged=Math.sqrt(Math.pow(n-d,2)+Math.pow(r-e,2)),this.hasDragged>10){l=b.isInsidePlot(n-h,r-i);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!s&&!m)this.selectionMarker=m=b.renderer.rect(h,i,f?1:k,g?1:j,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();m&&f&&(d-=n,m.attr({width:P(d),x:(d>0?0:d)+n}));
m&&g&&(d=e-r,m.attr({height:P(d),y:(d>0?0:d)+r}));l&&!m&&c.panning&&b.pan(a,c.panning)}},drop:function(a){var b=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},f=this.selectionMarker,g=f.attr?f.attr("x"):f.x,h=f.attr?f.attr("y"):f.y,i=f.attr?f.attr("width"):f.width,k=f.attr?f.attr("height"):f.height,j;if(this.hasDragged||d)o(c.axes,function(c){if(c.zoomEnabled&&q(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var f=c.horiz,n=a.type===
"touchend"?c.minPixelPadding:0,r=c.toValue((f?g:h)+n),f=c.toValue((f?g+i:h+k)-n);e[c.coll].push({axis:c,min:F(r,f),max:t(r,f)});j=!0}}),j&&H(c,"selection",e,function(a){c.zoom(u(a,d?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups()}if(c)L(c.container,{cursor:c._cursor}),c.cancelClick=this.hasDragged>10,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();
this.dragStart(a)},onDocumentMouseUp:function(a){S[ea]&&S[ea].pointer.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,a=this.normalize(a,c);c&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&this.reset()},onContainerMouseLeave:function(a){var b=S[ea];if(b&&(a.relatedTarget||a.toElement))b.pointer.reset(),b.pointer.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart;if(!q(ea)||!S[ea]||!S[ea].mouseIsDown)ea=
b.index;a=this.normalize(a);a.returnValue=!1;b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=K(a,"class")){if(c.indexOf(b)!==-1)return!0;if(c.indexOf("highcharts-container")!==-1)return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries,a=a.relatedTarget||a.toElement;if(b&&a&&!b.options.stickyTracking&&
!this.inClass(a,"highcharts-tooltip")&&!this.inClass(a,"highcharts-series-"+b.index))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(H(c.series,"click",u(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(u(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&H(b,"click",a)))},setDOMEvents:function(){var a=this,b=a.chart.container;b.onmousedown=
function(b){a.onContainerMouseDown(b)};b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};M(b,"mouseleave",a.onContainerMouseLeave);eb===1&&M(y,"mouseup",a.onDocumentMouseUp);if(db)b.ontouchstart=function(b){a.onContainerTouchStart(b)},b.ontouchmove=function(b){a.onContainerTouchMove(b)},eb===1&&M(y,"touchend",a.onDocumentTouchEnd)},destroy:function(){var a;V(this.chart.container,"mouseleave",this.onContainerMouseLeave);eb||(V(y,"mouseup",this.onDocumentMouseUp),
V(y,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(a in this)this[a]=null}};u(B.Pointer.prototype,{pinchTranslate:function(a,b,c,d,e,f){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,b,c,d,e,f);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,b,c,d,e,f)},pinchTranslateDirection:function(a,b,c,d,e,f,g,h){var i=this.chart,k=a?"x":"y",j=a?"X":"Y",l="chart"+j,m=a?"width":"height",n=i["plot"+(a?"Left":"Top")],r,s,p=h||1,o=i.inverted,x=i.bounds[a?
"h":"v"],w=b.length===1,q=b[0][l],t=c[0][l],u=!w&&b[1][l],A=!w&&c[1][l],B,c=function(){!w&&P(q-u)>20&&(p=h||P(t-A)/P(q-u));s=(n-t)/p+q;r=i["plot"+(a?"Width":"Height")]/p};c();b=s;b<x.min?(b=x.min,B=!0):b+r>x.max&&(b=x.max-r,B=!0);B?(t-=0.8*(t-g[k][0]),w||(A-=0.8*(A-g[k][1])),c()):g[k]=[t,A];o||(f[k]=s-n,f[m]=r);f=o?1/p:p;e[m]=r;e[k]=b;d[o?a?"scaleY":"scaleX":"scale"+j]=p;d["translate"+j]=f*n+(t-f*q)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=a.touches,f=e.length,g=b.lastValidTouch,h=
b.hasZoom,i=b.selectionMarker,k={},j=f===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||b.runChartClick),l={};if(f>1)b.initiated=!0;h&&b.initiated&&!j&&a.preventDefault();Ba(e,function(a){return b.normalize(a)});if(a.type==="touchstart")o(e,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),g.x=[d[0].chartX,d[1]&&d[1].chartX],g.y=[d[0].chartY,d[1]&&d[1].chartY],o(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(p(a.options.min,
a.dataMin)),f=a.toPixels(p(a.options.max,a.dataMax)),g=F(e,f),e=t(e,f);b.min=F(a.pos,g-d);b.max=t(a.pos+a.len,e+d)}}),b.res=!0;else if(d.length){if(!i)b.selectionMarker=i=u({destroy:Aa,touch:!0},c.plotBox);b.pinchTranslate(d,e,k,i,l,g);b.hasPinched=h;b.scaleGroups(k,l);if(!h&&b.followTouchMove&&f===1)this.runPointActions(b.normalize(a));else if(b.res)b.res=!1,this.reset(!1,0)}},touch:function(a,b){var c=this.chart;ea=c.index;a.touches.length===1?(a=this.normalize(a),c.isInsidePlot(a.chartX-c.plotLeft,
a.chartY-c.plotTop)&&!c.openMenu?(b&&this.runPointActions(a),this.pinch(a)):b&&this.reset()):a.touches.length===2&&this.pinch(a)},onContainerTouchStart:function(a){this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(a){S[ea]&&S[ea].pointer.drop(a)}});if(E.PointerEvent||E.MSPointerEvent){var va={},Db=!!E.PointerEvent,Sb=function(){var a,b=[];b.item=function(a){return this[a]};for(a in va)va.hasOwnProperty(a)&&b.push({pageX:va[a].pageX,pageY:va[a].pageY,target:va[a].target});
return b},Eb=function(a,b,c,d){if((a.pointerType==="touch"||a.pointerType===a.MSPOINTER_TYPE_TOUCH)&&S[ea])d(a),d=S[ea].pointer,d[b]({type:c,target:a.currentTarget,preventDefault:Aa,touches:Sb()})};u(Xa.prototype,{onContainerPointerDown:function(a){Eb(a,"onContainerTouchStart","touchstart",function(a){va[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){Eb(a,"onContainerTouchMove","touchmove",function(a){va[a.pointerId]={pageX:a.pageX,pageY:a.pageY};
if(!va[a.pointerId].target)va[a.pointerId].target=a.currentTarget})},onDocumentPointerUp:function(a){Eb(a,"onDocumentTouchEnd","touchend",function(a){delete va[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,Db?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,Db?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(y,Db?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});fb(Xa.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&
L(b.container,{"-ms-touch-action":"none","touch-action":"none"})});fb(Xa.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(M)});fb(Xa.prototype,"destroy",function(a){this.batchMSEvents(V);a.call(this)})}var ob=B.Legend=function(a,b){this.init(a,b)};ob.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=b.itemMarginTop||0;this.options=b;if(b.enabled)c.itemStyle=d,c.itemHiddenStyle=D(d,b.itemHiddenStyle),c.itemMarginTop=e,c.padding=d=p(b.padding,
8),c.initialItemX=d,c.initialItemY=d-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.symbolWidth=p(b.symbolWidth,16),c.pages=[],c.render(),M(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.legendColor||a.color||"#CCC":g,g=a.options&&a.options.marker,i={fill:h},k;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(k in i.stroke=
h,g=a.convertAttribs(g),g)d=g[k],d!==z&&(i[k]=d);f.attr(i)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;o(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Ta(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();
if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight,e=this.titleHeight;if(b)c=b.translateY,o(this.allItems,function(f){var g=f.checkbox,h;g&&(h=c+e+g.y+(a||0)+3,L(g,{left:b.translateX+f.checkboxOffset+g.x-20+"px",top:h+"px",display:h>c-6&&h<c+d-6?"":"none"}))})},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,
null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=c},setText:function(a){var b=this.options;a.legendItem.attr({text:b.labelFormat?Ka(b.labelFormat,a):b.labelFormatter.call(a)})},renderItem:function(a){var b=this.chart,c=b.renderer,d=this.options,e=d.layout==="horizontal",f=this.symbolWidth,g=d.symbolPadding,h=this.itemStyle,i=this.itemHiddenStyle,k=this.padding,j=e?p(d.itemDistance,
20):0,l=!d.rtl,m=d.width,n=d.itemMarginBottom||0,r=this.itemMarginTop,s=this.initialItemX,o=a.legendItem,v=a.series&&a.series.drawLegendSymbol?a.series:a,x=v.options,x=this.createCheckboxForItem&&x&&x.showCheckbox,w=d.useHTML;if(!o){a.legendGroup=c.g("legend-item").attr({zIndex:1}).add(this.scrollGroup);a.legendItem=o=c.text("",l?f+g:-g,this.baseline||0,w).css(D(a.visible?h:i)).attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup);if(!this.baseline)this.fontMetrics=c.fontMetrics(h.fontSize,o),
this.baseline=this.fontMetrics.f+3+r,o.attr("y",this.baseline);v.drawLegendSymbol(this,a);this.setItemEvents&&this.setItemEvents(a,o,w,h,i);x&&this.createCheckboxForItem(a)}this.colorizeItem(a,a.visible);this.setText(a);c=o.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+g+c.width+j+(x?20:0);this.itemHeight=g=A(a.legendItemHeight||c.height);if(e&&this.itemX-s+f>(m||b.chartWidth-2*k-s-d.x))this.itemX=s,this.itemY+=r+this.lastLineHeight+n,this.lastLineHeight=0;this.maxItemWidth=t(this.maxItemWidth,
f);this.lastItemY=r+this.itemY+n;this.lastLineHeight=t(g,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=r+g+n,this.lastLineHeight=g);this.offsetWidth=m||t((e?this.itemX-s-j:f)+k,this.offsetWidth)},getAllItems:function(){var a=[];o(this.chart.series,function(b){var c=b.options;if(p(c.showInLegend,!q(c.linkedTo)?z:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b))});return a},adjustMargins:function(a,b){var c=this.chart,d=this.options,e=d.align.charAt(0)+
d.verticalAlign.charAt(0)+d.layout.charAt(0);this.display&&!d.floating&&o([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,g){f.test(e)&&!q(a[g])&&(c[nb[g]]=t(c[nb[g]],c.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*d[g%2?"x":"y"]+p(d.margin,12)+b[g]))})},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,k=a.options,j=a.padding,l=k.borderWidth,m=k.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=
0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=a.getAllItems();ib(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});k.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;a.lastLineHeight=0;o(e,function(b){a.renderItem(b)});g=(k.width||a.offsetWidth)+j;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);h+=j;if(l||m){if(i){if(g>
0&&h>0)i[i.isNew?"attr":"animate"](i.crisp({width:g,height:h})),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,k.borderRadius,l||0).attr({stroke:k.borderColor,"stroke-width":l||0,fill:m||"none"}).add(d).shadow(k.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;o(e,function(b){a.positionItem(b)});f&&d.align(u({width:g,height:h},k),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+
(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h,i=this.clipRect,k=e.navigation,j=p(k.animation,!0),l=k.arrowSize||12,m=this.nav,n=this.pages,r=this.padding,s,R=this.allItems,v=function(a){i.attr({height:a});if(b.contentGroup.div)b.contentGroup.div.style.clip="rect("+r+"px,9999px,"+(r+a)+"px,0)"};e.layout==="horizontal"&&(f/=2);g&&(f=F(f,g));n.length=0;if(a>f){this.clipHeight=h=t(f-20-this.titleHeight-r,0);this.currentPage=p(this.currentPage,1);this.fullHeight=a;o(R,function(a,b){var c=
a._legendItemPos[1],d=A(a.legendItem.getBBox().height),e=n.length;if(!e||c-n[e-1]>h&&(s||c)!==n[e-1])n.push(s||c),e++;b===R.length-1&&c+d-n[e-1]>h&&n.push(c);c!==s&&(s=c)});if(!i)i=b.clipRect=d.clipRect(0,r,9999,0),b.contentGroup.clip(i);v(h);if(!m)this.nav=m=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,j)}).add(m),this.pager=d.text("",15,10).css(k.style).add(m),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,
j)}).add(m);b.scroll(0);a=f}else if(m)v(c.chartHeight),m.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pages,d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,h=g.activeColor,g=g.inactiveColor,i=this.pager,k=this.padding;e>d&&(e=d);if(e>0)b!==z&&Ua(b,this.chart),this.nav.attr({translateX:k,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":
"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c)}};J=B.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options.symbolHeight||a.fontMetrics.f;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-c+1,a.symbolWidth,c,a.options.symbolRadius||0).attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=
this.options,c=b.marker,d=a.symbolWidth,e=this.chart.renderer,f=this.legendGroup,a=a.baseline-A(a.fontMetrics.b*0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=e.path(["M",0,a,"L",d,a]).attr(g).add(f)}if(c&&c.enabled!==!1)b=c.radius,this.legendSymbol=c=e.symbol(this.symbol,d/2-b,a-b,2*b,2*b,c).add(f),c.isMarker=!0}};(/Trident\/7\.0/.test(za)||Ma)&&fb(ob.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,
b)};d();setTimeout(d)});var hb=B.Chart=function(){this.getArgs.apply(this,arguments)};B.chart=function(a,b,c){return new hb(a,b,c)};hb.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(xa(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(a,b){var c,d=a.series;a.series=null;c=D(N,a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=this.splashArray("spacing",d);var e=d.events;this.bounds=
{h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=S.length;S.push(f);eb++;d.reflow!==!1&&M(f,"load",function(){f.initReflow()});if(e)for(g in e)M(f,g,e[g]);f.xAxis=[];f.yAxis=[];f.animation=ha?!1:p(d.animation,!0);f.pointCount=f.colorCounter=f.symbolCounter=0;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=I[a.type||b.type||b.defaultSeriesType])||X(17,!0);b=new b;b.init(this,a);return b},
isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.hasCartesianSeries,k=this.isDirtyBox,j=c.length,l=j,m=this.renderer,n=m.isHidden(),r=[];Ua(a,this);n&&this.cloneRenderTo();for(this.layOutTitles();l--;)if(a=c[l],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(l=j;l--;)if(a=c[l],a.options.stacking)a.isDirty=!0;o(c,function(a){a.isDirty&&
a.options.legendType==="point"&&(a.updateTotals&&a.updateTotals(),f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(i&&!this.isResizing)this.maxTicks=null,o(b,function(a){a.setScale()});this.getMargins();i&&(o(b,function(a){a.isDirty&&(k=!0)}),o(b,function(a){var b=a.min+","+a.max;if(a.extKey!==b)a.extKey=b,r.push(function(){H(a,"afterSetExtremes",u(a.eventArgs,a.getExtremes()));delete a.eventArgs});(k||g)&&a.redraw()}));k&&this.drawChartBox();o(c,function(a){a.isDirty&&
a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);m.draw();H(this,"redraw");n&&this.cloneRenderTo(!0);o(r,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ta(b.xAxis||{}),b=b.yAxis=ta(b.yAxis||
{});o(c,function(a,b){a.index=b;a.isX=!0});o(b,function(a,b){a.index=b});c=c.concat(b);o(c,function(b){new ka(a,b)})},getSelectedPoints:function(){var a=[];o(this.series,function(b){a=a.concat(Na(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return Na(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var g;var d=this,e=d.options,f;f=e.title=D(e.title,a);g=e.subtitle=D(e.subtitle,b),e=g;o([["title",a,f],["subtitle",b,e]],function(a){var b=
a[0],c=d[b],e=a[1],a=a[2];c&&e&&(d[b]=c=c.destroy());a&&a.text&&!c&&(d[b]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c=this.title,d=this.subtitle,e=this.options,f=e.title,e=e.subtitle,g=this.renderer,h=this.spacingBox.width-44;if(c&&(c.css({width:(f.width||h)+"px"}).align(u({y:g.fontMetrics(f.style.fontSize,c).b-3},f),!1,"spacingBox"),!f.floating&&!f.verticalAlign))b=
c.getBBox().height;d&&(d.css({width:(e.width||h)+"px"}).align(u({y:b+(f.margin-13)+g.fontMetrics(e.style.fontSize,c).b},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign&&(b=ua(b+d.getBBox().height)));c=this.titleOffset!==b;this.titleOffset=b;if(!this.isDirtyBox&&c)this.isDirtyBox=c,this.hasRendered&&p(a,!0)&&this.isDirtyBox&&this.redraw()},getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;if(!q(b))this.containerWidth=ja(c,"width");if(!q(a))this.containerHeight=
ja(c,"height");this.chartWidth=t(0,b||this.containerWidth||600);this.chartHeight=t(0,p(a,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Ta(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),L(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block",
"important"),y.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options,c=b.chart,d,e;a=this.renderTo;var f="highcharts-"+zb++;if(!a)this.renderTo=a=c.renderTo;if(xa(a))this.renderTo=a=y.getElementById(a);a||X(13,!0);d=C(K(a,"data-highcharts-chart"));!isNaN(d)&&S[d]&&S[d].hasRendered&&S[d].destroy();K(a,"data-highcharts-chart",this.index);a.innerHTML="";!c.skipClone&&!a.offsetWidth&&this.cloneRenderTo();this.getChartSize();d=this.chartWidth;e=this.chartHeight;this.container=
a=Z(La,{className:"highcharts-container"+(c.className?" "+c.className:""),id:f},u({position:"relative",overflow:"hidden",width:d+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},c.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=new (B[c.renderer]||cb)(a,d,e,c.style,c.forExport,b.exporting&&b.exporting.allowHTML);ha&&this.renderer.create(this,a,d,e);this.renderer.chartIndex=this.index},getMargins:function(a){var b=
this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();if(d&&!q(c[0]))this.plotTop=t(this.plotTop,d+this.options.title.margin+b[0]);this.legend.adjustMargins(c,b);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&o(a.axes,function(a){a.visible&&a.getOffset()});o(nb,function(d,e){q(c[e])||(a[d]+=
b[e])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||ja(d,"width"),f=c.height||ja(d,"height"),c=a?a.target:E;if(!b.hasUserSize&&!b.isPrinting&&e&&f&&(c===E||c===y)){if(e!==b.containerWidth||f!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=Pa(function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=null},a?100:0);b.containerWidth=e;b.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};M(E,"resize",b);M(a,"destroy",
function(){V(E,"resize",b)})},setSize:function(a,b,c){var d=this,e,f,g=d.renderer;d.isResizing+=1;Ua(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;if(q(a))d.chartWidth=e=t(0,A(a)),d.hasUserSize=!!e;if(q(b))d.chartHeight=f=t(0,A(b));a=g.globalAnimation;(a?Wa:L)(d.container,{width:e+"px",height:f+"px"},a);d.setChartSize(!0);g.setSize(e,f,c);d.maxTicks=null;o(d.axes,function(a){a.isDirty=!0;a.setScale()});o(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();
d.getMargins();d.redraw(c);d.oldChartHeight=null;H(d,"resize");a=g.globalAnimation;Pa(function(){d&&H(d,"endResize",null,function(){d.isResizing-=1})},a===!1?0:a&&a.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,h=this.clipOffset,i,k,j,l;this.plotLeft=i=A(this.plotLeft);this.plotTop=k=A(this.plotTop);this.plotWidth=j=t(0,A(d-i-this.marginRight));this.plotHeight=l=t(0,A(e-k-this.marginBottom));this.plotSizeX=
b?l:j;this.plotSizeY=b?j:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};this.plotBox=c.plotBox={x:i,y:k,width:j,height:l};d=2*T(this.plotBorderWidth/2);b=ua(t(d,h[3])/2);c=ua(t(d,h[0])/2);this.clipBox={x:b,y:c,width:T(this.plotSizeX-t(d,h[1])/2-b),height:t(0,T(this.plotSizeY-t(d,h[2])/2-c))};a||o(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this;o(nb,function(b,c){a[b]=p(a.margin[c],
a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,k=a.backgroundColor,j=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,n,r=this.plotLeft,p=this.plotTop,o=this.plotWidth,v=this.plotHeight,x=this.plotBox,w=this.clipRect,t=this.clipBox;n=i+(a.shadow?8:0);if(i||k)if(e)e.animate(e.crisp({width:c-
n,height:d-n}));else{e={fill:k||"none"};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(n/2,n/2,c-n,d-n,a.borderRadius,i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)}if(j)f?f.animate(x):this.plotBackground=b.rect(r,p,o,v,0).attr({fill:j}).add().shadow(a.plotShadow);if(l)h?h.animate(x):this.plotBGImage=b.image(l,r,p,o,v).add();w?w.animate({width:t.width,height:t.height}):this.clipRect=b.clipRect(t);if(m)g?(g.strokeWidth=-m,g.animate(g.crisp({x:r,y:p,
width:o,height:v}))):this.plotBorder=b.rect(r,p,o,v,0,-m).attr({stroke:a.plotBorderColor,"stroke-width":m,fill:"none",zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;o(["inverted","angular","polar"],function(g){c=I[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=I[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,b=a.series;o(b,function(a){a.linkedSeries.length=
0});o(b,function(b){var d=b.options.linkedTo;if(xa(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),b.linkedParent=d,b.visible=p(b.options.visible,d.options.visible,b.visible)})},renderSeries:function(){o(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&o(b.items,function(c){var d=u(b.style,c.style),e=C(d.left)+a.plotLeft,f=C(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,f).attr({zIndex:2}).css(d).add()})},
render:function(){var a=this.axes,b=this.renderer,c=this.options,d,e,f,g;this.setTitle();this.legend=new ob(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;e=this.plotHeight-=21;o(a,function(a){a.setScale()});this.getAxisMargins();f=d/this.plotWidth>1.1;g=e/this.plotHeight>1.05;if(f||g)this.maxTicks=null,o(a,function(a){(a.horiz&&f||!a.horiz&&g)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&o(a,function(a){a.visible&&
a.render()});if(!this.seriesGroup)this.seriesGroup=b.g("series-group").attr({zIndex:3}).add();this.renderSeries();this.renderLabels();this.showCredits(c.credits);this.hasRendered=!0},showCredits:function(a){if(a.enabled&&!this.credits)this.credits=this.renderer.text(a.text,0,0).on("click",function(){if(a.href)E.location.href=a.href}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position)},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;H(a,
"destroy");S[a.index]=z;eb--;a.renderTo.removeAttribute("data-highcharts-chart");V(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();o("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",V(d),f&&Ta(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;
return!ca&&E==E.top&&y.readyState!=="complete"||ha&&!E.canvg?(ha?Ob.push(function(){a.firstRender()},a.options.global.canvasToolsURL):y.attachEvent("onreadystatechange",function(){y.detachEvent("onreadystatechange",a.firstRender);y.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();H(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();o(b.series||[],function(b){a.initSeries(b)});a.linkSeries();
H(a,"beforeRender");if(B.Pointer)a.pointer=new Xa(a,b);a.render();a.renderer.draw();if(!a.renderer.imgCount)a.onload();a.cloneRenderTo(!0)}},onload:function(){var a=this;o([this.callback].concat(this.callbacks),function(b){b&&a.index!==void 0&&b.apply(a,[a])});a.renderer.imgCount||H(a,"load")},splashArray:function(a,b){var c=b[a],c=Y(c)?c:[c,c,c,c];return[p(b[a+"Top"],c[0]),p(b[a+"Right"],c[1]),p(b[a+"Bottom"],c[2]),p(b[a+"Left"],c[3])]}};var Cb=B.CenteredSeriesMixin={getCenter:function(){var a=this.options,
b=this.chart,c=2*(a.slicedOffset||0),d=b.plotWidth-2*c,b=b.plotHeight-2*c,e=a.center,e=[p(e[0],"50%"),p(e[1],"50%"),a.size||"100%",a.innerSize||0],f=F(d,b),g,h;for(g=0;g<4;++g)h=e[g],a=g<2||g===2&&/%$/.test(h),e[g]=(/%$/.test(h)?[d,b,f,e[2]][g]*parseFloat(h)/100:parseFloat(h))+(a?c:0);e[3]>e[2]&&(e[3]=e[2]);return e}},Ha=function(){};Ha.prototype={init:function(a,b,c){this.series=a;this.color=a.color;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,
this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.options.pointValKey||c.pointValKey,a=Ha.prototype.optionsToObject.call(this,a);u(this,a);this.options=this.options?u(this.options,a):a;if(d)this.y=this[d];this.isNull=this.y===null;if(typeof this.x!=="number"&&c)this.x=b===void 0?c.autoIncrement():b;return this},optionsToObject:function(a){var b={},c=this.series,d=c.options.keys,
e=d||c.pointArrayMap||["y"],f=e.length,g=0,h=0;if(typeof a==="number"||a===null)b[e[0]]=a;else if(Ia(a)){if(!d&&a.length>f){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];g++}for(;h<f;){if(!d||a[g]!==void 0)b[e[h]]=a[g];g++;h++}}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),oa(b,this),!b.length))a.hoverPoints=
null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)V(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,
total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=p(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";o(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Ka(a,{point:this,series:this.series})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&
e.allowPointSelect&&(c=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});H(this,a,b,c)},visible:!0};var Q=B.Series=function(){};Q.prototype={isCartesian:!0,type:"line",pointClass:Ha,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function(a,b){var c=this,d,e,f=a.series,g=function(a,b){return p(a.options.index,a._i)-
p(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();u(c,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(ha)b.animation=!1;e=b.events;for(d in e)M(c,d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();o(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-
1;ib(f,g);this.yAxis&&ib(this.yAxis.series,g);o(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;o(a.axisTypes||[],function(e){o(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==z&&b[e]===d.id||b[e]===z&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0});!a[e]&&a.optionalAxis!==e&&X(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments;o(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?
c.toYData(a):a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))})},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=p(b,a.pointStart,0);this.pointInterval=c=p(this.pointInterval,a.pointInterval,1);if(d==="month"||d==="year")a=new qa(b),a=d==="month"?+a[xb](a[ab]()+c):+a[yb](a[bb]()+c),c=a-b;this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=
b.plotOptions||{},e=c[this.type];this.userOptions=a;c=D(e,c.series,a);this.tooltipOptions=D(N.tooltip,N.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();if((c.negativeColor||c.negativeFillColor)&&!c.zones)a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&q(a[a.length-1].value)&&
a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var d=this.userOptions,e="_"+a+"Index",f=a+"Counter";b||(q(d[e])?b=d[e]:(d[e]=b=this.chart[f]%c.length,this.chart[f]+=1),b=c[b]);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||aa[this.type].color,this.chart.options.colors)},getSymbol:function(){var a=this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);if(/^url/.test(this.symbol))a.radius=
0},drawLegendSymbol:J.drawLineMarker,setData:function(a,b,c,d){var e=this,f=e.points,g=f&&f.length||0,h,i=e.options,k=e.chart,j=null,l=e.xAxis,m=l&&!!l.categories,n=i.turboThreshold,r=this.xData,s=this.yData,t=(h=e.pointArrayMap)&&h.length,a=a||[];h=a.length;b=p(b,!0);if(d!==!1&&h&&g===h&&!e.cropped&&!e.hasGroupedData&&e.visible)o(a,function(a,b){f[b].update&&a!==i.data[b]&&f[b].update(a,!1,null,!1)});else{e.xIncrement=null;e.colorCounter=0;o(this.parallelArrays,function(a){e[a+"Data"].length=0});
if(n&&h>n){for(c=0;j===null&&c<h;)j=a[c],c++;if(ma(j)){m=p(i.pointStart,0);j=p(i.pointInterval,1);for(c=0;c<h;c++)r[c]=m,s[c]=a[c],m+=j;e.xIncrement=m}else if(Ia(j))if(t)for(c=0;c<h;c++)j=a[c],r[c]=j[0],s[c]=j.slice(1,t+1);else for(c=0;c<h;c++)j=a[c],r[c]=j[0],s[c]=j[1];else X(12)}else for(c=0;c<h;c++)if(a[c]!==z&&(j={series:e},e.pointClass.prototype.applyOptions.apply(j,[a[c]]),e.updateParallelArrays(j,c),m&&q(j.name)))l.names[j.x]=j.name;xa(s[0])&&X(14,!0);e.data=[];e.options.data=e.userOptions.data=
a;for(c=g;c--;)f[c]&&f[c].destroy&&f[c].destroy();if(l)l.minRange=l.userMinRange;e.isDirty=e.isDirtyData=k.isDirtyBox=!0;c=!1}i.legendType==="point"&&(this.processData(),this.generatePoints());b&&k.redraw(c)},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i,k=this.options;i=k.cropThreshold;var j=this.getExtremesFromAll||k.getExtremesFromAll,l=this.isCartesian,k=h&&h.val2lin,m=h&&h.isLog,n,p;if(l&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;
if(h)a=h.getExtremes(),n=a.min,p=a.max;if(l&&this.sorted&&!j&&(!i||d>i||this.forceCrop))if(b[d-1]<n||b[0]>p)b=[],c=[];else if(b[0]<n||b[d-1]>p)e=this.cropData(this.xData,this.yData,n,p),b=e.xData,c=e.yData,e=e.start,f=!0;for(i=b.length||1;--i;)d=m?k(b[i])-k(b[i-1]):b[i]-b[i-1],d>0&&(g===z||d<g)?g=d:d<0&&this.requireSorting&&X(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h=p(this.cropShoulder,
1),i;for(i=0;i<e;i++)if(a[i]>=c){f=t(0,i-h);break}for(c=i;c<e;c++)if(a[c]>d){g=c+h;break}return{xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,k=this.hasGroupedData,j,l=[],m;if(!b&&!k)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,k?l[m]=(new f).init(this,[d[m]].concat(ta(e[m]))):(b[i]?j=b[i]:a[i]!==z&&(b[i]=j=(new f).init(this,
a[i],d[m])),l[m]=j),l[m].index=i;if(b&&(g!==(c=b.length)||k))for(m=0;m<c;m++)if(m===h&&!k&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=z;this.data=b;this.points=l},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,k,j,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++)if(k=c[l],j=a[l],i=j!==null&&j!==z&&(!b.isLog||j.length||j>0),k=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||
(c[l+1]||k)>=g&&(c[l-1]||k)<=h,i&&k)if(i=j.length)for(;i--;)j[i]!==null&&(e[f++]=j[i]);else e[f++]=j;this.dataMin=Ra(e);this.dataMax=Ea(e)},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,k=i==="between"||ma(i),j=a.threshold,l=a.startFromThreshold?j:0,m,n,r,o,R=Number.MAX_VALUE,a=0;a<g;a++){var v=f[a],x=v.x,w=v.y;n=v.low;var u=
b&&e.stacks[(this.negStacks&&w<(l?0:j)?"-":"")+this.stackKey];if(e.isLog&&w!==null&&w<=0)v.y=w=null,X(10);v.plotX=m=F(t(-1E5,c.translate(x,0,0,0,1,i,this.type==="flags")),1E5);if(b&&this.visible&&!v.isNull&&u&&u[x])o=this.getStackIndicator(o,x,this.index),u=u[x],w=u.points[o.key],n=w[0],w=w[1],n===l&&(n=p(j,e.min)),e.isLog&&n<=0&&(n=null),v.total=v.stackTotal=u.total,v.percentage=u.total&&v.y/u.total*100,v.stackY=w,u.setOffset(this.pointXOffset||0,this.barW||0);v.yBottom=q(n)?e.translate(n,0,1,0,
1):null;h&&(w=this.modifyValue(w,v));v.plotY=n=typeof w==="number"&&w!==Infinity?F(t(-1E5,e.translate(w,0,1,0,1)),1E5):z;v.isInside=n!==z&&n>=0&&n<=e.len&&m>=0&&m<=c.len;v.clientX=k?c.translate(x,0,0,0,1):m;v.negative=v.y<(j||0);v.category=d&&d[v.x]!==z?d[v.x]:v.x;a&&(R=F(R,P(m-r)));r=m}this.closestPointRangePx=R},getValidPoints:function(a){return Na(a||this.points,function(a){return!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,g=f||b.clipBox,
h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(","),i=b[h],k=b[h+"m"];if(!i){if(a)g.width=0,b[h+"m"]=k=d.clipRect(-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight);b[h]=i=d.clipRect(g)}a&&(i.count+=1);if(c.clip!==!1)this.group.clip(a||f?i:b.clipRect),this.markerGroup.clip(k),this.sharedClipKey=h;a||(i.count-=1,i.count<=0&&h&&b[h]&&(f||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,c=this.options.animation,
d;if(c&&!Y(c))c=aa[this.type].animation;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();H(this,"afterAnimate")},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,k,j,l=this.options.marker,m=this.pointAttr[""],n,r,o,t=this.markerGroup,v=p(l.enabled,this.xAxis.isRadial,this.closestPointRangePx>2*l.radius);if(l.enabled!==!1||this._hasPointMarkers)for(f=
b.length;f--;)if(g=b[f],d=T(g.plotX),e=g.plotY,j=g.graphic,n=g.marker||{},r=!!g.marker,a=v&&n.enabled===z||n.enabled,o=g.isInside,a&&e!==z&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""]||m,h=a.r,i=p(n.symbol,this.symbol),k=i.indexOf("url")===0,j)j[o?"show":"hide"](!0).attr(a).animate(u({x:d-h,y:e-h},j.symbolName?{width:2*h,height:2*h}:{}));else{if(o&&(h>0||k))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h,r?n:l).attr(a).add(t)}else if(j)g.graphic=j.destroy()},convertAttribs:function(a,
b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=p(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=aa[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h=a.options.negativeColor;f={stroke:g,fill:g};var i=a.points||[],k,j,l=[],m=a.pointAttrToOptions;k=a.hasPointSpecificOptions;var n=c.lineColor,r=c.fillColor;j=b.turboThreshold;var s=a.zones,t=a.zoneAxis||"y",v;b.marker?(e.radius=e.radius||c.radius+e.radiusPlus,
e.lineWidth=e.lineWidth||c.lineWidth+e.lineWidthPlus):(e.color=e.color||ia(e.color||g).brighten(e.brightness).get(),e.negativeColor=e.negativeColor||ia(e.negativeColor||h).brighten(e.brightness).get());l[""]=a.convertAttribs(c,f);o(["hover","select"],function(b){l[b]=a.convertAttribs(d[b],l[""])});a.pointAttr=l;g=i.length;if(!j||g<j||k)for(;g--;){j=i[g];if((c=j.options&&j.options.marker||j.options)&&c.enabled===!1)c.radius=0;if(s.length){k=0;for(f=s[k];j[t]>=f.value;)f=s[++k];j.color=j.fillColor=
p(f.color,a.color)}k=b.colorByPoint||j.color;if(j.options)for(v in m)q(c[m[v]])&&(k=!0);if(k){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker||j.negative&&!f.fillColor&&!e.fillColor)f[a.pointAttrToOptions.fill]=f.color||!j.options.color&&e[j.negative&&h?"negativeColor":"color"]||ia(j.color).brighten(f.brightness||e.brightness).get();f={color:j.color};if(!r)f.fillColor=j.color;if(!n)f.lineColor=j.color;c.hasOwnProperty("color")&&!c.color&&delete c.color;k[""]=a.convertAttribs(u(f,c),
l[""]);k.hover=a.convertAttribs(d.hover,l.hover,k[""]);k.select=a.convertAttribs(d.select,l.select,k[""])}else k=l;j.pointAttr=k}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(za),d,e=a.data||[],f,g,h;H(a,"destroy");V(a);o(a.axisTypes||[],function(b){if(h=a[b])oa(h.series,a),h.isDirty=h.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(d=e.length;d--;)(f=e[d])&&f.destroy&&f.destroy();a.points=null;clearTimeout(a.animationTimeout);for(g in a)a[g]instanceof O&&!a[g].survive&&
(d=c&&g==="group"?"hide":"destroy",a[g][d]());if(b.hoverSeries===a)b.hoverSeries=null;oa(b.series,a);for(g in a)delete a[g]},getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,g,h=[],i,a=a||d.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);e.connectNulls&&!b&&!c&&(a=this.getValidPoints(a));o(a,function(g,j){var l=g.plotX,m=g.plotY,n=a[j-1];if((g.leftCliff||n&&n.rightCliff)&&!c)i=!0;g.isNull&&!q(b)&&j>0?i=!e.connectNulls:g.isNull&&!b?i=!0:(j===0||i?n=["M",g.plotX,
g.plotY]:d.getPointSpline?n=d.getPointSpline(a,g,j):f?(n=f===1?["L",n.plotX,m]:f===2?["L",(n.plotX+l)/2,n.plotY,"L",(n.plotX+l)/2,m]:["L",l,n.plotY],n.push("L",l,m)):n=["L",l,m],h.push.apply(h,n),i=!1)});return d.graphPath=h},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color,b.dashStyle]],d=b.lineWidth,e=b.linecap!=="square",f=(this.gappedPath||this.getGraphPath).call(this),g=this.fillGraph&&this.color||"none";o(this.zones,function(d,e){c.push(["zoneGraph"+e,d.color||
a.color,d.dashStyle||b.dashStyle])});o(c,function(c,i){var k=c[0],j=a[k];if(j)j.animate({d:f});else if((d||g)&&f.length)j={stroke:c[1],"stroke-width":d,fill:g,zIndex:1},c[2]?j.dashstyle=c[2]:e&&(j["stroke-linecap"]=j["stroke-linejoin"]="round"),a[k]=a.chart.renderer.path(f).attr(j).add(a.group).shadow(i<2&&b.shadow)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,f,g=this.clips||[],h,i=this.graph,k=this.area,j=t(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||"y")+
"Axis"],m,n=l.reversed,r=b.inverted,s=l.horiz,q,v,x,w=!1;if(d.length&&(i||k)&&l.min!==z)i&&i.hide(),k&&k.hide(),m=l.getExtremes(),o(d,function(d,o){e=n?s?b.plotWidth:0:s?0:l.toPixels(m.min);e=F(t(p(f,e),0),j);f=F(t(A(l.toPixels(p(d.value,m.max),!0)),0),j);w&&(e=f=l.toPixels(m.max));q=Math.abs(e-f);v=F(e,f);x=t(e,f);if(l.isXAxis){if(h={x:r?x:v,y:0,width:q,height:j},!s)h.x=b.plotHeight-h.x}else if(h={x:0,y:r?x:v,width:j,height:q},s)h.y=b.plotWidth-h.y;b.inverted&&c.isVML&&(h=l.isXAxis?{x:0,y:n?v:x,
height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});g[o]?g[o].animate(h):(g[o]=c.clipRect(h),i&&a["zoneGraph"+o].clip(g[o]),k&&a["zoneArea"+o].clip(g[o]));w=d.value>m.max}),this.clips=g},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};o(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)M(c,"resize",a),M(b,"destroy",function(){V(c,"resize",a)}),a(),b.invertGroups=
a},plotGroup:function(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({zIndex:d||0.1}).add(e),f.addClass("highcharts-series-"+this.index));f.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;if(a.inverted)b=c,c=this.xAxis;return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=(c=d.animation)&&!!a.animate&&
b.renderer.isSVG&&p(c.duration,500)||0,f=a.visible?"inherit":"hidden",g=d.zIndex,h=a.hasRendered,i=b.seriesGroup;c=a.plotGroup("group","series",f,g,i);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,i);e&&a.animate(!0);a.getAttribs();c.inverted=a.isCartesian?b.inverted:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());o(a.points,function(a){a.redraw&&a.redraw()});a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&a.options.enableMouseTracking!==!1&&a.drawTracker();b.inverted&&
a.invertGroups();d.clip!==!1&&!a.sharedClipKey&&!h&&c.clip(b.clipRect);e&&a.animate();if(!h)a.animationTimeout=Pa(function(){a.afterAnimate()},e);a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.isDirty,d=this.group,e=this.xAxis,f=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:p(e&&e.left,a.plotLeft),translateY:p(f&&f.top,a.plotTop)}));this.translate();this.render();b&&H(this,"updatedData");
(c||b)&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,e,f){var g,h;if(h=c&&c.length)return g=b.kdAxisArray[e%f],c.sort(function(a,b){return a[g]-b[g]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),e+1,f),right:a(c.slice(h+1),e+1,f)}}var b=this,
c=b.kdDimensions;delete b.kdTree;Pa(function(){b.kdTree=a(b.getValidPoints(),c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,k,j){var l=b.point,m=d.kdAxisArray[k%j],n,p,o=l;p=q(a[e])&&q(l[e])?Math.pow(a[e]-l[e],2):null;n=q(a[f])&&q(l[f])?Math.pow(a[f]-l[f],2):null;n=(p||0)+(n||0);l.dist=q(n)?Math.sqrt(n):Number.MAX_VALUE;l.distX=q(p)?Math.sqrt(p):Number.MAX_VALUE;m=a[m]-l[m];n=m<0?"left":"right";p=m<0?"right":"left";b[n]&&(n=c(a,b[n],k+1,j),o=n[g]<o[g]?n:l);b[p]&&Math.sqrt(m*
m)<o[g]&&(a=c(a,b[p],k+1,j),o=a[g]<o[g]?a:o);return o}var d=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],g=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}};Kb.prototype={destroy:function(){Sa(this,this.axis)},render:function(a){var b=this.options,c=b.format,c=c?Ka(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,b.useHTML).css(b.style).attr({align:this.textAlign,
rotation:b.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=c.reversed,f=this.isNegative&&!f||!this.isNegative&&f,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=P(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e[this.options.crop===!1||d.isInsidePlot(f.x,f.y)?"show":"hide"](!0)}};hb.prototype.getStacks=
function(){var a=this;o(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});o(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+p(b.options.stack,"")})};ka.prototype.buildStacks=function(){var a=this.series,b,c=p(this.options.reversedStacks,!0),d=a.length,e;if(!this.isXAxis){this.usePercentage=!1;for(e=d;e--;)a[c?e:d-e-1].setStackedPoints();for(e=d;e--;)b=a[c?e:d-e-1],b.setStackCliffs&&b.setStackCliffs();
if(this.usePercentage)for(e=0;e<d;e++)a[e].setPercentStacks()}};ka.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,c=this.stacks,d,e,f=this.stackTotalGroup;if(!f)this.stackTotalGroup=f=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(a.plotLeft,a.plotTop);for(d in c)for(e in a=c[d],a)a[e].render(f)};ka.prototype.resetStacks=function(){var a=this.stacks,b,c;if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].touched<this.stacksTouched?(a[b][c].destroy(),
delete a[b][c]):(a[b][c].total=null,a[b][c].cum=0)};ka.prototype.cleanStacks=function(){var a,b,c;if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}};Q.prototype.setStackedPoints=function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.startFromThreshold?f:0,h=e.stack,e=e.stacking,i=this.stackKey,
k="-"+i,j=this.negStacks,l=this.yAxis,m=l.stacks,n=l.oldStacks,o,s,q,v,x,w,u;l.stacksTouched+=1;for(x=0;x<d;x++){w=a[x];u=b[x];o=this.getStackIndicator(o,w,this.index);v=o.key;q=(s=j&&u<(g?0:f))?k:i;m[q]||(m[q]={});if(!m[q][w])n[q]&&n[q][w]?(m[q][w]=n[q][w],m[q][w].total=null):m[q][w]=new Kb(l,l.options.stackLabels,s,w,h);q=m[q][w];if(u!==null)q.points[v]=q.points[this.index]=[p(q.cum,g)],q.touched=l.stacksTouched,o.index>0&&this.singleStacks===!1&&(q.points[v][0]=q.points[this.index+","+w+",0"][0]);
e==="percent"?(s=s?i:k,j&&m[s]&&m[s][w]?(s=m[s][w],q.total=s.total=t(s.total,q.total)+P(u)||0):q.total=fa(q.total+(P(u)||0))):q.total=fa(q.total+(u||0));q.cum=p(q.cum,g)+(u||0);u!==null&&q.points[v].push(q.cum);c[x]=q.cum}if(e==="percent")l.usePercentage=!0;this.stackedYData=c;l.oldStacks={}}};Q.prototype.setPercentStacks=function(){var a=this,b=a.stackKey,c=a.yAxis.stacks,d=a.processedXData,e;o([b,"-"+b],function(b){var f;for(var g=d.length,h,i;g--;)if(h=d[g],e=a.getStackIndicator(e,h,a.index),f=
(i=c[b]&&c[b][h])&&i.points[e.key],h=f)i=i.total?100/i.total:0,h[0]=fa(h[0]*i),h[1]=fa(h[1]*i),a.stackedYData[g]=h[1]})};Q.prototype.getStackIndicator=function(a,b,c){!q(a)||a.x!==b?a={x:b,index:0}:a.index++;a.key=[c,b,a.index].join(",");return a};u(hb.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),H(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;
new ka(this,D(a,{index:this[e].length,isX:b}));f[e]=ta(f[e]||{});f[e].push(a);p(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&L(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};if(!d)b.loadingDiv=d=Z(La,{className:"highcharts-loading"},u(e.style,{zIndex:10,display:"none"}),b.container),b.loadingSpan=Z("span",null,e.labelStyle,d),M(b,"redraw",f);b.loadingSpan.innerHTML=a||c.lang.loading;
if(!b.loadingShown)L(d,{opacity:0,display:""}),Wa(d,{opacity:e.style.opacity},{duration:e.showDuration||0}),b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&Wa(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){L(b,{display:"none"})}});this.loadingShown=!1}});u(Ha.prototype,{update:function(a,b,c,d){function e(){f.applyOptions(a);if(f.y===null&&h)f.graphic=h.destroy();if(Y(a)&&!Ia(a))f.redraw=function(){if(h&&h.element&&a&&a.marker&&a.marker.symbol)f.graphic=
h.destroy();if(a&&a.dataLabels&&f.dataLabel)f.dataLabel=f.dataLabel.destroy();f.redraw=null};i=f.index;g.updateParallelArrays(f,i);if(l&&f.name)l[f.x]=f.name;j.data[i]=Y(j.data[i])?f.options:a;g.isDirty=g.isDirtyData=!0;if(!g.fixedBox&&g.hasCartesianSeries)k.isDirtyBox=!0;if(j.legendType==="point")k.isDirtyLegend=!0;b&&k.redraw(c)}var f=this,g=f.series,h=f.graphic,i,k=g.chart,j=g.options,l=g.xAxis&&g.xAxis.names,b=p(b,!0);d===!1?e():f.firePointEvent("update",{options:a},e)},remove:function(a,b){this.series.removePoint(sa(this,
this.series.data),a,b)}});u(Q.prototype,{addPoint:function(a,b,c,d){var e=this,f=e.options,g=e.data,h=e.graph,i=e.area,k=e.chart,j=e.xAxis&&e.xAxis.names,l=h&&h.shift||0,m=["graph","area"],h=f.data,n,r=e.xData;Ua(d,k);if(c){for(d=e.zones.length;d--;)m.push("zoneGraph"+d,"zoneArea"+d);o(m,function(a){if(e[a])e[a].shift=l+(f.step?2:1)})}if(i)i.isArea=!0;b=p(b,!0);i={series:e};e.pointClass.prototype.applyOptions.apply(i,[a]);m=i.x;d=r.length;if(e.requireSorting&&m<r[d-1])for(n=!0;d&&r[d-1]>m;)d--;e.updateParallelArrays(i,
"splice",d,0,0);e.updateParallelArrays(i,d);if(j&&i.name)j[m]=i.name;h.splice(d,0,a);n&&(e.data.splice(d,0,null),e.processData());f.legendType==="point"&&e.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),e.updateParallelArrays(i,"shift"),h.shift()));e.isDirty=!0;e.isDirtyData=!0;b&&(e.getAttribs(),k.redraw())},removePoint:function(a,b,c){var d=this,e=d.data,f=e[a],g=d.points,h=d.chart,i=function(){g&&g.length===e.length&&g.splice(a,1);e.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||
{series:d},"splice",a,1);f&&f.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw()};Ua(c,h);b=p(b,!0);f?f.firePointEvent("remove",null,i):i()},remove:function(a,b){var c=this,d=c.chart;H(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();p(a,!0)&&d.redraw(b)})},update:function(a,b){var c=this,d=this.chart,e=this.userOptions,f=this.type,g=I[f].prototype,h=["group","markerGroup","dataLabelsGroup"],i;if(a.type&&a.type!==f||a.zIndex!==void 0)h.length=0;o(h,function(a){h[a]=
c[a];delete c[a]});a=D(e,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);for(i in g)this[i]=z;u(this,I[a.type||f].prototype);o(h,function(a){c[a]=h[a]});this.init(d,a);d.linkSeries();p(b,!0)&&d.redraw(!1)}});u(ka.prototype,{update:function(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=D(this.userOptions,a);this.destroy(!0);this._addedPlotLB=this.chart._labelPanes=z;this.init(c,u(a,{events:z}));c.isDirtyBox=!0;p(b,!0)&&c.redraw()},
remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);oa(b.axes,this);oa(b[c],this);b.options[c].splice(this.options.index,1);o(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}});var wa=pa(Q);I.line=wa;aa.area=D(da,{softThreshold:!1,threshold:0});var la=pa(Q,{type:"area",singleStacks:!1,getStackPoints:function(){var a=
[],b=[],c=this.xAxis,d=this.yAxis,e=d.stacks[this.stackKey],f={},g=this.points,h=this.index,i=d.series,k=i.length,j,l=p(d.options.reversedStacks,!0)?1:-1,m,n;if(this.options.stacking){for(m=0;m<g.length;m++)f[g[m].x]=g[m];for(n in e)e[n].total!==null&&b.push(+n);b.sort(function(a,b){return a-b});j=Ba(i,function(){return this.visible});o(b,function(g,i){var n=0,p,q;if(f[g]&&!f[g].isNull)a.push(f[g]),o([-1,1],function(a){var c=a===1?"rightNull":"leftNull",d=0,n=e[b[i+a]];if(n)for(m=h;m>=0&&m<k;)p=n.points[m],
p||(m===h?f[g][c]=!0:j[m]&&(q=e[g].points[m])&&(d-=q[1]-q[0])),m+=l;f[g][a===1?"rightCliff":"leftCliff"]=d});else{for(m=h;m>=0&&m<k;){if(p=e[g].points[m]){n=p[1];break}m+=l}n=d.toPixels(n,!0);a.push({isNull:!0,plotX:c.toPixels(g,!0),plotY:n,yBottom:n})}})}return a},getGraphPath:function(a){var b=Q.prototype.getGraphPath,c=this.options,d=c.stacking,e=this.yAxis,f,g,h=[],i=[],k=this.index,j,l=e.stacks[this.stackKey],m=c.threshold,n=e.getThreshold(c.threshold),o,c=c.connectNulls||d==="percent",s=function(b,
c,f){var g=a[b],b=d&&l[g.x].points[k],p=g[f+"Null"]||0,f=g[f+"Cliff"]||0,o,r,g=!0;f||p?(o=(p?b[0]:b[1])+f,r=b[0]+f,g=!!p):!d&&a[c]&&a[c].isNull&&(o=r=m);o!==void 0&&(i.push({plotX:j,plotY:o===null?n:e.toPixels(o,!0),isNull:g}),h.push({plotX:j,plotY:r===null?n:e.toPixels(r,!0)}))},a=a||this.points;d&&(a=this.getStackPoints());for(f=0;f<a.length;f++)if(g=a[f].isNull,j=p(a[f].rectPlotX,a[f].plotX),o=p(a[f].yBottom,n),!g||c){c||s(f,f-1,"left");if(!g||d||!c)i.push(a[f]),h.push({x:f,plotX:j,plotY:o});c||
s(f,f+1,"right")}f=b.call(this,i,!0,!0);h.reversed=!0;g=b.call(this,h,!0,!0);g.length&&(g[0]="L");f=f.concat(g);b=b.call(this,i,!1,c);this.areaPath=f;return b},drawGraph:function(){this.areaPath=[];Q.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=[["area",this.color,c.fillColor]];o(this.zones,function(b,f){d.push(["zoneArea"+f,b.color||a.color,b.fillColor||c.fillColor])});o(d,function(d){var f=d[0],g=a[f];g?g.animate({d:b}):(g={fill:d[2]||d[1],zIndex:0},d[2]||(g["fill-opacity"]=
p(c.fillOpacity,0.75)),a[f]=a.chart.renderer.path(b).attr(g).add(a.group))})},drawLegendSymbol:J.drawRectangle});I.area=la;aa.spline=D(da);wa=pa(Q,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],c=a[c+1],g,h,i,k;if(f&&!f.isNull&&c&&!c.isNull){a=f.plotY;i=c.plotX;var c=c.plotY,j=0;g=(1.5*d+f.plotX)/2.5;h=(1.5*e+a)/2.5;i=(1.5*d+i)/2.5;k=(1.5*e+c)/2.5;i!==g&&(j=(k-h)*(i-d)/(i-g)+e-k);h+=j;k+=j;h>a&&h>e?(h=t(a,e),k=2*e-h):h<a&&h<e&&(h=F(a,e),k=2*e-h);k>c&&k>e?(k=t(c,e),
h=2*e-k):k<c&&k<e&&(k=F(c,e),h=2*e-k);b.rightContX=i;b.rightContY=k}b=["C",p(f.rightContX,f.plotX),p(f.rightContY,f.plotY),p(g,d),p(h,e),d,e];f.rightContX=f.rightContY=null;return b}});I.spline=wa;aa.areaspline=D(aa.area);la=la.prototype;wa=pa(wa,{type:"areaspline",getStackPoints:la.getStackPoints,getGraphPath:la.getGraphPath,setStackCliffs:la.setStackCliffs,drawGraph:la.drawGraph,drawLegendSymbol:J.drawRectangle});I.areaspline=wa;aa.column=D(da,{borderColor:"#FFFFFF",borderRadius:0,groupPadding:0.2,
marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1,halo:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0});wa=pa(Q,{type:"column",pointAttrToOptions:{stroke:"borderColor",fill:"color",r:"borderRadius"},cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,
init:function(){Q.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&o(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h=0;b.grouping===!1?h=1:o(a.chart.series,function(b){var c=b.options,e=b.yAxis,i;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===z&&(g[f]=h++),i=g[f]):c.grouping!==!1&&(i=h++),b.columnIndex=i});var i=F(P(c.transA)*(c.ordinalSlope||
b.pointRange||c.closestPointRange||c.tickInterval||1),c.len),k=i*b.groupPadding,j=(i-2*k)/h,b=F(b.maxPointWidth||c.len,p(b.pointWidth,j*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(j-b)/2+(k+((a.columnIndex||0)+(e?1:0))*j-i/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,b,c,d){var e=this.chart,f=this.borderWidth,g=-(f%2?0.5:0),f=f%2?0.5:1;e.inverted&&e.renderer.isVML&&(f+=1);c=Math.round(a+c)+g;a=Math.round(a)+g;c-=a;d=Math.round(b+d)+f;g=P(b)<=0.5&&d>0.5;b=Math.round(b)+f;d-=
b;g&&(b-=1,d+=1);return{x:a,y:b,width:c,height:d}},translate:function(){var a=this,b=a.chart,c=a.options,d=a.borderWidth=p(c.borderWidth,a.closestPointRange*a.xAxis.transA<2?0:1),e=a.yAxis,f=a.translatedThreshold=e.getThreshold(c.threshold),g=p(c.minPointLength,5),h=a.getColumnMetrics(),i=h.width,k=a.barW=t(i,1+2*d),j=a.pointXOffset=h.offset;b.inverted&&(f-=0.5);c.pointPadding&&(k=ua(k));Q.prototype.translate.apply(a);o(a.points,function(c){var d=F(p(c.yBottom,f),9E4),h=999+P(d),h=F(t(-h,c.plotY),
e.len+h),o=c.plotX+j,s=k,q=F(h,d),v,u=t(h,d)-q;P(u)<g&&g&&(u=g,v=!e.reversed&&!c.negative||e.reversed&&c.negative,q=P(q-f)>g?d-g:f-(v?g:0));c.barX=o;c.pointWidth=i;c.tooltipPos=b.inverted?[e.len+e.pos-b.plotLeft-h,a.xAxis.len-o-s/2,u]:[o+s/2,h+e.pos-b.plotTop,u];c.shapeType="rect";c.shapeArgs=a.crispCol(o,q,s,u)})},getSymbol:Aa,drawLegendSymbol:J.drawRectangle,drawGraph:Aa,drawPoints:function(){var a=this,b=this.chart,c=a.options,d=b.renderer,e=c.animationLimit||250,f,g;o(a.points,function(h){var i=
h.plotY,k=h.graphic;if(i!==z&&!isNaN(i)&&h.y!==null)f=h.shapeArgs,i=q(a.borderWidth)?{"stroke-width":a.borderWidth}:{},g=h.pointAttr[h.selected?"select":""]||a.pointAttr[""],k?(Oa(k),k.attr(i).attr(g)[b.pointCount<e?"animate":"attr"](D(f))):h.graphic=d[h.shapeType](f).attr(i).attr(g).add(h.group||a.group).shadow(c.shadow,null,c.stacking&&!c.borderRadius);else if(k)h.graphic=k.destroy()})},animate:function(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(ca)a?(e.scaleY=0.001,a=F(b.pos+
b.len,t(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&o(b.series,function(b){if(b.type===a.type)b.isDirty=!0});Q.prototype.remove.apply(a,arguments)}});I.column=wa;aa.bar=D(aa.column);la=pa(wa,{type:"bar",inverted:!0});I.bar=la;aa.scatter=D(da,{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}});la=pa(Q,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&Q.prototype.drawGraph.call(this)}});I.scatter=la;aa.pie=D(da,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.y===null?void 0:
this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});da={type:"pie",isCartesian:!1,pointClass:pa(Ha,{init:function(){Ha.prototype.init.apply(this,arguments);var a=this,b;a.name=p(a.name,"Slice");b=function(b){a.slice(b.type==="select")};M(a,"select",b);M(a,"unselect",b);return a},setVisible:function(a,b){var c=this,d=c.series,e=d.chart,f=d.options.ignoreHiddenPoint,
b=p(b,f);if(a!==c.visible){c.visible=c.options.visible=a=a===z?!c.visible:a;d.options.data[sa(c,d.data)]=c.options;o(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)});c.legendItem&&e.legend.colorizeItem(c,a);!a&&c.state==="hover"&&c.setState("");if(f)d.isDirty=!0;b&&e.redraw()}},slice:function(a,b,c){var d=this.series;Ua(c,d.chart);p(b,!0);this.sliced=this.options.sliced=a=q(a)?a:!this.sliced;d.options.data[sa(this,d.data)]=this.options;a=a?this.slicedTranslation:
{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var b=this.shapeArgs,c=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.plotLeft+b.x,c.plotTop+b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}}),requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",
fill:"color"},animate:function(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)o(c,function(a){var c=a.graphic,g=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:d,end:d}),c.animate({r:g.r,start:g.start,end:g.end},b.options.animation))}),b.animate=null},updateTotals:function(){var a,b=0,c=this.points,d=c.length,e,f=this.options.ignoreHiddenPoint;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=b>0&&(e.visible||!f)?e.y/b*100:0,e.total=b},generatePoints:function(){Q.prototype.generatePoints.call(this);
this.updateTotals()},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,k=this.startAngleRad=ra/180*(i-90),i=(this.endAngleRad=ra/180*(p(c.endAngle,i+360)-90))-k,j=this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,n=j.length,o;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=W.asin(F((b-a[1])/(a[2]/2+l),1));return a[0]+(c?-1:1)*U(h)*(a[2]/2+l)};for(m=0;m<n;m++){o=j[m];f=k+b*i;if(!c||o.visible)b+=o.percentage/
100;g=k+b*i;o.shapeType="arc";o.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:A(f*1E3)/1E3,end:A(g*1E3)/1E3};h=(g+f)/2;h>1.5*ra?h-=2*ra:h<-ra/2&&(h+=2*ra);o.slicedTranslation={translateX:A(U(h)*d),translateY:A($(h)*d)};f=U(h)*a[2]/2;g=$(h)*a[2]/2;o.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];o.half=h<-ra/2||h>ra/2?1:0;o.angle=h;e=F(e,l/2);o.labelPos=[a[0]+f+U(h)*l,a[1]+g+$(h)*l,a[0]+f+U(h)*e,a[1]+g+$(h)*e,a[0]+f,a[1]+g,l<0?"center":o.half?"right":"left",h]}},drawGraph:null,drawPoints:function(){var a=
this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g,h,i;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);o(a.points,function(k){if(k.y!==null){d=k.graphic;h=k.shapeArgs;f=k.shadowGroup;g=k.pointAttr[k.selected?"select":""];if(!g.stroke)g.stroke=g.fill;if(e&&!f)f=k.shadowGroup=b.g("shadow").add(a.shadowGroup);c=k.sliced?k.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);if(d)d.setRadialReference(a.center).attr(g).animate(u(h,c));else{i={"stroke-linejoin":"round"};if(!k.visible)i.visibility=
"hidden";k.graphic=d=b[k.shapeType](h).setRadialReference(a.center).attr(g).attr(i).attr(c).add(a.group).shadow(e,f)}}})},searchPoint:Aa,sortByAngle:function(a,b){a.sort(function(a,d){return a.angle!==void 0&&(d.angle-a.angle)*b})},drawLegendSymbol:J.drawRectangle,getCenter:Cb.getCenter,getSymbol:Aa};da=pa(Q,da);I.pie=da;Q.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,e=a.points,f,g,h=a.hasRendered||0,i,k,j=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&
a.dlProcessOptions(d),k=a.plotGroup("dataLabelsGroup","data-labels",d.defer?"hidden":"visible",d.zIndex||6),p(d.defer,!0)&&(k.attr({opacity:+h}),h||M(a,"afterAnimate",function(){a.visible&&k.show();k[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),g=d,o(e,function(e){var h,n=e.dataLabel,o,s,t=e.connector,v=!0,x,w={};f=e.dlOptions||e.options&&e.options.dataLabels;h=p(f&&f.enabled,g.enabled)&&e.y!==null;if(n&&!h)e.dataLabel=n.destroy();else if(h){d=D(g,f);x=d.style;h=d.rotation;o=e.getLabelConfig();
i=d.format?Ka(d.format,o):d.formatter.call(o,d);x.color=p(d.color,x.color,a.color,"black");if(n)if(q(i))n.attr({text:i}),v=!1;else{if(e.dataLabel=n=n.destroy(),t)e.connector=t.destroy()}else if(q(i)){n={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:h,padding:d.padding,zIndex:1};if(x.color==="contrast")w.color=d.inside||d.distance<0||b.stacking?j.getContrast(e.color||a.color):"#000000";if(c)w.cursor=c;for(s in n)n[s]===z&&delete n[s];n=e.dataLabel=
j[h?"text":"label"](i,0,-9999,d.shape,null,null,d.useHTML).attr(n).css(u(x,w)).add(k).shadow(d.shadow)}n&&a.alignDataLabel(e,n,d,null,v)}})};Q.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=p(a.plotX,-9999),i=p(a.plotY,-9999),k=b.getBBox(),j=f.renderer.fontMetrics(c.style.fontSize).b,l=c.rotation,m=c.align,n=this.visible&&(a.series.forceDL||f.isInsidePlot(h,A(i),g)||d&&f.isInsidePlot(h,g?d.x+1:d.y+d.height-1,g)),o=p(c.overflow,"justify")==="justify";if(n)d=u({x:g?f.plotWidth-
i:h,y:A(g?f.plotHeight-h:i),width:0,height:0},d),u(c,{width:k.width,height:k.height}),l?(o=!1,g=f.renderer.rotCorr(j,l),g={x:d.x+c.x+d.width/2+g.x,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](g).attr({align:c.align}),h=(l+720)%360,h=h>180&&h<360,m==="left"?g.y-=h?k.height:0:m==="center"?(g.x-=k.width/2,g.y-=k.height/2):m==="right"&&(g.x-=k.width,g.y-=h?0:k.height)):(b.align(c,null,d),g=b.alignAttr),o?this.justifyDataLabel(b,c,g,k,d,e):p(c.crop,!0)&&(n=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+k.width,
g.y+k.height)),c.shape&&!l&&b.attr({anchorX:a.plotX,anchorY:a.plotY});if(!n)Oa(b),b.attr({y:-9999}),b.placed=!1};Q.prototype.justifyDataLabel=function(a,b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,k,j,l=a.box?0:a.padding||0;k=c.x+l;if(k<0)h==="right"?b.align="left":b.x=-k,j=!0;k=c.x+d.width-l;if(k>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-k,j=!0;k=c.y+l;if(k<0)i==="bottom"?b.verticalAlign="top":b.y=-k,j=!0;k=c.y+d.height-l;if(k>g.plotHeight)i==="top"?b.verticalAlign="bottom":
b.y=g.plotHeight-k,j=!0;if(j)a.placed=!f,a.align(b,null,e)};if(I.pie)I.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=p(e.connectorPadding,10),g=p(e.connectorWidth,1),h=d.plotWidth,i=d.plotHeight,k,j,l=p(e.softConnector,!0),m=e.distance,n=a.center,r=n[2]/2,q=n[1],u=m>0,v,x,w,B=[[],[]],z,y,E,D,C,G=[0,0,0,0],L=function(a,b){return b.y-a.y};if(a.visible&&(e.enabled||a._hasPointLabels)){Q.prototype.drawDataLabels.apply(a);o(b,function(a){if(a.dataLabel&&
a.visible)B[a.half].push(a),a.dataLabel._pos=null});for(D=2;D--;){var H=[],M=[],I=B[D],K=I.length,J;if(K){a.sortByAngle(I,D-0.5);for(C=b=0;!b&&I[C];)b=I[C]&&I[C].dataLabel&&(I[C].dataLabel.getBBox().height||21),C++;if(m>0){x=F(q+r+m,d.plotHeight);for(C=t(0,q-r-m);C<=x;C+=b)H.push(C);x=H.length;if(K>x){c=[].concat(I);c.sort(L);for(C=K;C--;)c[C].rank=C;for(C=K;C--;)I[C].rank>=x&&I.splice(C,1);K=I.length}for(C=0;C<K;C++){c=I[C];w=c.labelPos;c=9999;var O,N;for(N=0;N<x;N++)O=P(H[N]-w[1]),O<c&&(c=O,J=N);
if(J<C&&H[C]!==null)J=C;else for(x<K-C+J&&H[C]!==null&&(J=x-K+C);H[J]===null;)J++;M.push({i:J,y:H[J]});H[J]=null}M.sort(L)}for(C=0;C<K;C++){c=I[C];w=c.labelPos;v=c.dataLabel;E=c.visible===!1?"hidden":"inherit";c=w[1];if(m>0){if(x=M.pop(),J=x.i,y=x.y,c>y&&H[J+1]!==null||c<y&&H[J-1]!==null)y=F(t(0,c),d.plotHeight)}else y=c;z=e.justify?n[0]+(D?-1:1)*(r+m):a.getX(y===q-r-m||y===q+r+m?c:y,D);v._attr={visibility:E,align:w[6]};v._pos={x:z+e.x+({left:f,right:-f}[w[6]]||0),y:y+e.y-10};v.connX=z;v.connY=y;
if(this.options.size===null)x=v.width,z-x<f?G[3]=t(A(x-z+f),G[3]):z+x>h-f&&(G[1]=t(A(z+x-h+f),G[1])),y-b/2<0?G[0]=t(A(-y+b/2),G[0]):y+b/2>i&&(G[2]=t(A(y+b/2-i),G[2]))}}}if(Ea(G)===0||this.verifyDataLabelOverflow(G))this.placeDataLabels(),u&&g&&o(this.points,function(b){k=b.connector;w=b.labelPos;if((v=b.dataLabel)&&v._pos&&b.visible)E=v._attr.visibility,z=v.connX,y=v.connY,j=l?["M",z+(w[6]==="left"?5:-5),y,"C",z,y,2*w[2]-w[4],2*w[3]-w[5],w[2],w[3],"L",w[4],w[5]]:["M",z+(w[6]==="left"?5:-5),y,"L",
w[2],w[3],"L",w[4],w[5]],k?(k.animate({d:j}),k.attr("visibility",E)):b.connector=k=a.chart.renderer.path(j).attr({"stroke-width":g,stroke:e.connectorColor||b.color||"#606060",visibility:E}).add(a.dataLabelsGroup);else if(k)b.connector=k.destroy()})}},I.pie.prototype.placeDataLabels=function(){o(this.points,function(a){var b=a.dataLabel;if(b&&a.visible)(a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999})})},I.pie.prototype.alignDataLabel=Aa,I.pie.prototype.verifyDataLabelOverflow=
function(a){var b=this.center,c=this.options,d=c.center,e=c.minSize||80,f=e,g;d[0]!==null?f=t(b[2]-t(a[1],a[3]),e):(f=t(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2);d[1]!==null?f=t(F(f,b[2]-t(a[0],a[2])),e):(f=t(F(f,b[2]-a[0]-a[2]),e),b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,b[3]=Math.min(/%$/.test(c.innerSize||0)?f*parseFloat(c.innerSize||0)/100:parseFloat(c.innerSize||0),f),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):g=!0;return g};if(I.column)I.column.prototype.alignDataLabel=function(a,
b,c,d,e){var f=this.chart.inverted,g=a.series,h=a.dlBox||a.shapeArgs,i=p(a.below,a.plotY>p(this.translatedThreshold,g.yAxis.len)),k=p(c.inside,!!this.options.stacking);if(h){d=D(h);if(d.y<0)d.height+=d.y,d.y=0;h=d.y+d.height-g.yAxis.len;h>0&&(d.height-=h);f&&(d={x:g.yAxis.len-d.y-d.height,y:g.xAxis.len-d.x-d.width,width:d.height,height:d.width});if(!k)f?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0)}c.align=p(c.align,!f||k?"center":i?"right":"left");c.verticalAlign=p(c.verticalAlign,
f||k?"middle":i?"top":"bottom");Q.prototype.alignDataLabel.call(this,a,b,c,d,e)};(function(a){var b=a.Chart,c=a.each,d=a.pick,e=a.addEvent;b.prototype.callbacks.push(function(a){function b(){var e=[];c(a.series,function(a){var b=a.options.dataLabels,f=a.dataLabelCollections||["dataLabel"];(b.enabled||a._hasPointLabels)&&!b.allowOverlap&&a.visible&&c(f,function(b){c(a.points,function(a){if(a[b])a[b].labelrank=d(a.labelrank,a.shapeArgs&&a.shapeArgs.height),e.push(a[b])})})});a.hideOverlappingLabels(e)}
b();e(a,"redraw",b)});b.prototype.hideOverlappingLabels=function(a){var b=a.length,d,e,k,j,l,m,n,o,p;for(e=0;e<b;e++)if(d=a[e])d.oldOpacity=d.opacity,d.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(e=0;e<b;e++){k=a[e];for(d=e+1;d<b;++d)if(j=a[d],k&&j&&k.placed&&j.placed&&k.newOpacity!==0&&j.newOpacity!==0&&(l=k.alignAttr,m=j.alignAttr,n=k.parentGroup,o=j.parentGroup,p=2*(k.box?0:k.padding),l=!(m.x+o.translateX>l.x+n.translateX+(k.width-p)||m.x+o.translateX+(j.width-
p)<l.x+n.translateX||m.y+o.translateY>l.y+n.translateY+(k.height-p)||m.y+o.translateY+(j.height-p)<l.y+n.translateY)))(k.labelrank<j.labelrank?k:j).newOpacity=0}c(a,function(a){var b,c;if(a){c=a.newOpacity;if(a.oldOpacity!==c&&a.placed)c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b);a.isOld=!0}})}})(B);da=B.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(a){for(var c=
a.target,d;c&&!d;)d=c.point,c=c.parentNode;if(d!==z&&d!==b.hoverPoint)d.onMouseOver(a)};o(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});if(!a._hasTracking)o(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),db))a[b].on("touchstart",f)}),a._hasTracking=!0},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:
a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,k=a.tracker,j=b.cursor,l=j&&{cursor:j},m=function(){if(f.hoverSeries!==a)a.onMouseOver()},n="rgba(192,192,192,"+(ca?1.0E-4:0.002)+")";if(e&&!c)for(j=e+1;j--;)d[j]==="M"&&d.splice(j+1,0,d[j+1]-i,d[j+2],"L"),(j&&d[j]==="M"||j===e)&&d.splice(j,0,"L",d[j-2]+i,d[j-1]);k?k.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:n,fill:c?n:"none","stroke-width":b.lineWidth+
(c?0:2*i),zIndex:2}).add(a.group),o([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){g.onTrackerMouseOut(a)}).css(l);if(db)a.on("touchstart",m)}))}};if(I.column)wa.prototype.drawTracker=da.drawTrackerPoint;if(I.pie)I.pie.prototype.drawTracker=da.drawTrackerPoint;if(I.scatter)la.prototype.drawTracker=da.drawTrackerPoint;u(ob.prototype,{setItemEvents:function(a,b,c,d,e){var f=this;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");
b.css(f.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d:e);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):H(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=Z("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);M(a.checkbox,"click",function(b){H(a.series||a,"checkboxClick",
{checked:b.target.checked,item:a},function(){a.select()})})}});N.legend.itemStyle.cursor="pointer";u(hb.prototype,{showResetZoom:function(){var a=this,b=N.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;H(a,"selection",{resetSelection:!0},
function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?o(this.axes,function(a){b=a.zoom()}):o(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&Y(e))this.resetZoomButton=e.destroy();b&&this.redraw(p(this.options.chart.animation,a&&a.animation,this.pointCount<100))},pan:function(a,b){var c=this,d=c.hoverPoints,
e;d&&o(d,function(a){a.setState()});o(b==="xy"?[1,0]:[1],function(b){var b=c[b?"xAxis":"yAxis"][0],d=b.horiz,h=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",i=c[d],k=(b.pointRange||0)/2,j=b.getExtremes(),l=b.toValue(i-h,!0)+k,k=b.toValue(i+b.len-h,!0)-k,i=i>h;if(b.series.length&&(i||l>F(j.dataMin,j.min))&&(!i||k<t(j.dataMax,j.max)))b.setExtremes(l,k,!1,!1,{trigger:"pan"}),e=!0;c[d]=h});e&&c.redraw(!1);L(c.container,{cursor:"move"})}});u(Ha.prototype,{select:function(a,b){var c=this,d=c.series,
e=d.chart,a=p(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[sa(c,d.data)]=c.options;c.setState(a&&"select");b||o(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[sa(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a,b){var c=this.series,d=c.chart,e=d.tooltip,f=d.hoverPoint;if(d.hoverSeries!==c)c.onMouseOver();if(f&&f!==this)f.onMouseOut();
if(this.series&&(this.firePointEvent("mouseOver"),e&&(!e.shared||c.noSharedTooltip)&&e.refresh(this,a),this.setState("hover"),!b))d.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");if(!b||sa(this,b)===-1)this.setState(),a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=D(this.series.options.point,this.options).events,b;this.events=a;for(b in a)M(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=
T(this.plotX),d=this.plotY,e=this.series,f=e.options.states,g=aa[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],k=i&&i.enabled===!1,j=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,n=e.halo,o,a=a||"";o=this.pointAttr[a]||e.pointAttr[a];if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(k||h&&i.enabled===!1)||a&&l.states&&l.states[a]&&l.states[a].enabled===!1)){if(this.graphic)g=g&&this.graphic.symbolName&&o.r,this.graphic.attr(D(o,g?{x:c-g,y:d-
g,width:2*g,height:2*g}:{})),j&&j.hide();else{if(a&&i)if(g=i.radius,l=l.symbol||e.symbol,j&&j.currentSymbol!==l&&(j=j.destroy()),j)j[b?"animate":"attr"]({x:c-g,y:d-g});else if(l)e.stateMarkerGraphic=j=m.renderer.symbol(l,c-g,d-g,2*g,2*g).attr(o).add(e.markerGroup),j.currentSymbol=l;if(j)j[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"](),j.element.point=this}if((c=f[a]&&f[a].halo)&&c.size){if(!n)e.halo=n=m.renderer.path().add(m.seriesGroup);n.attr(u({fill:this.color||e.color,"fill-opacity":c.opacity,
zIndex:-1},c.attributes))[b?"animate":"attr"]({d:this.haloPath(c.size)})}else n&&n.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted,f=Math.floor(this.plotX);return c.renderer.symbols.circle(d.translateX+(e?b.yAxis.len-this.plotY:f)-a,d.translateY+(e?b.xAxis.len-f:this.plotY)-a,a*2,a*2)}});u(Q.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&H(this,"mouseOver");this.setState("hover");
a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&H(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState()},setState:function(a){var b=this.options,c=this.graph,d=b.states,e=b.lineWidth,b=0,a=a||"";if(this.state!==a&&(this.state=a,!(d[a]&&d[a].enabled===!1)&&(a&&(e=d[a].lineWidth||e+(d[a].lineWidthPlus||0)),c&&!c.dashstyle))){a={"stroke-width":e};
for(c.attr(a);this["zoneGraph"+b];)this["zoneGraph"+b].attr(a),b+=1}},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===z?!h:a)?"show":"hide";o(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&o(d.series,function(a){if(a.options.stacking&&
a.visible)a.isDirty=!0});o(c.linkedSeries,function(b){b.setVisible(a,!1)});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();H(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===z?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;H(this,a?"select":"unselect")},drawTracker:da.drawTrackerGraph});u(B,{Color:ia,Point:Ha,Tick:Va,Renderer:cb,SVGElement:O,SVGRenderer:Ca,arrayMin:Ra,arrayMax:Ea,charts:S,dateFormat:Qa,error:X,format:Ka,pathAnim:void 0,
getOptions:function(){return N},hasBidiBug:Qb,isTouchDevice:Mb,setOptions:function(a){N=D(!0,N,a);Fb();return N},addEvent:M,removeEvent:V,createElement:Z,discardElement:Ta,css:L,each:o,map:Ba,merge:D,splat:ta,stableSort:ib,extendClass:pa,pInt:C,svg:ca,canvas:ha,vml:!ca&&!ha,product:"Highcharts",version:"4.2.3"});return B});
;
/*
 Highcharts JS v4.2.3 (2016-02-08)
 Exporting module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){typeof module==="object"&&module.exports?module.exports=f:f(Highcharts)})(function(f){var r=f.win,m=r.document,A=f.Chart,t=f.addEvent,B=f.removeEvent,C=f.fireEvent,n=f.createElement,s=f.discardElement,v=f.css,l=f.merge,i=f.each,q=f.extend,F=f.splat,G=Math.max,H=f.isTouchDevice,I=f.Renderer.prototype.symbols,y=f.getOptions(),z;q(y.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",
contextButtonTitle:"Chart context menu"});y.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:H?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};
y.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",
onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(a,b,e){var c,a=n("form",l({method:"post",action:a,enctype:"multipart/form-data"},e),{display:"none"},m.body);for(c in b)n("input",{type:"hidden",name:c,value:b[c]},null,a);a.submit();s(a)};q(A.prototype,{sanitizeSVG:function(a){return a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g,
" xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad").replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g,
" ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(b){return b.toLowerCase()})},getChartHTML:function(){return this.container.innerHTML},getSVG:function(a){var b=this,e,c,g,j,k,d=l(b.options,a),J=d.exporting.allowHTML;if(!m.createElementNS)m.createElementNS=function(b,a){return m.createElement(a)};c=n("div",null,{position:"absolute",top:"-9999em",width:b.chartWidth+"px",height:b.chartHeight+"px"},m.body);g=b.renderTo.style.width;k=b.renderTo.style.height;g=d.exporting.sourceWidth||
d.chart.width||/px$/.test(g)&&parseInt(g,10)||600;k=d.exporting.sourceHeight||d.chart.height||/px$/.test(k)&&parseInt(k,10)||400;q(d.chart,{animation:!1,renderTo:c,forExport:!0,renderer:"SVGRenderer",width:g,height:k});d.exporting.enabled=!1;delete d.data;d.series=[];i(b.series,function(a){j=l(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});j.isInternal||d.series.push(j)});a&&i(["xAxis","yAxis"],function(b){i(F(a[b]),function(a,c){d[b][c]=l(d[b][c],a)})});e=
new f.Chart(d,b.callback);i(["xAxis","yAxis"],function(a){i(b[a],function(b,c){var d=e[a][c],f=b.getExtremes(),g=f.userMin,f=f.userMax;d&&(g!==void 0||f!==void 0)&&d.setExtremes(g,f,!0,!1)})});g=e.getChartHTML();d=null;e.destroy();s(c);if(J&&(c=g.match(/<\/svg>(.*?$)/)))c='<foreignObject x="0" y="0" width="200" height="200"><body xmlns="http://www.w3.org/1999/xhtml">'+c[1]+"</body></foreignObject>",g=g.replace("</svg>",c+"</svg>");g=this.sanitizeSVG(g);return g=g.replace(/(url\(#highcharts-[0-9]+)&quot;/g,
"$1").replace(/&quot;/g,"'")},getSVGForExport:function(a,b){var e=this.options.exporting;return this.getSVG(l({chart:{borderRadius:0}},e.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||e.sourceWidth,sourceHeight:a&&a.sourceHeight||e.sourceHeight}}))},exportChart:function(a,b){var e=this.getSVGForExport(a,b),a=l(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale||2,svg:e},a.formAttributes)},print:function(){var a=this,b=a.container,
e=[],c=b.parentNode,f=m.body,j=f.childNodes;if(!a.isPrinting)a.isPrinting=!0,a.pointer.reset(null,0),C(a,"beforePrint"),i(j,function(a,b){if(a.nodeType===1)e[b]=a.style.display,a.style.display="none"}),f.appendChild(b),r.focus(),r.print(),setTimeout(function(){c.appendChild(b);i(j,function(a,b){if(a.nodeType===1)a.style.display=e[b]});a.isPrinting=!1;C(a,"afterPrint")},1E3)},contextMenu:function(a,b,e,c,f,j,k){var d=this,l=d.options.navigation,D=l.menuItemStyle,o=d.chartWidth,p=d.chartHeight,E="cache-"+
a,h=d[E],u=G(f,j),w,x,r,s=function(b){d.pointer.inClass(b.target,a)||x()};if(!h)d[E]=h=n("div",{className:a},{position:"absolute",zIndex:1E3,padding:u+"px"},d.container),w=n("div",null,q({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},l.menuStyle),h),x=function(){v(h,{display:"none"});k&&k.setState(0);d.openMenu=!1},t(h,"mouseleave",function(){r=setTimeout(x,500)}),t(h,"mouseenter",function(){clearTimeout(r)}),t(m,"mouseup",s),t(d,"destroy",function(){B(m,
"mouseup",s)}),i(b,function(a){if(a){var b=a.separator?n("hr",null,null,w):n("div",{onmouseover:function(){v(this,l.menuItemHoverStyle)},onmouseout:function(){v(this,D)},onclick:function(b){b&&b.stopPropagation();x();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},q({cursor:"pointer"},D),w);d.exportDivElements.push(b)}}),d.exportDivElements.push(w,h),d.exportMenuWidth=h.offsetWidth,d.exportMenuHeight=h.offsetHeight;b={display:"block"};e+d.exportMenuWidth>o?b.right=
o-e-f-u+"px":b.left=e-u+"px";c+j+d.exportMenuHeight>p&&k.alignOptions.verticalAlign!=="top"?b.bottom=p-c-u+"px":b.top=c+j-u+"px";v(h,b);d.openMenu=!0},addButton:function(a){var b=this,e=b.renderer,c=l(b.options.navigation.buttonOptions,a),g=c.onclick,j=c.menuItems,k,d,m={stroke:c.symbolStroke,fill:c.symbolFill},i=c.symbolSize||12;if(!b.btnCount)b.btnCount=0;if(!b.exportDivElements)b.exportDivElements=[],b.exportSVGElements=[];if(c.enabled!==!1){var o=c.theme,p=o.states,n=p&&p.hover,p=p&&p.select,
h;delete o.states;g?h=function(a){a.stopPropagation();g.call(b,a)}:j&&(h=function(){b.contextMenu(d.menuClassName,j,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});c.text&&c.symbol?o.paddingLeft=f.pick(o.paddingLeft,25):c.text||q(o,{width:c.width,height:c.height,padding:0});d=e.button(c.text,0,0,h,o,n,p).attr({title:b.options.lang[c._titleKey],"stroke-linecap":"round",zIndex:3});d.menuClassName=a.menuClassName||"highcharts-menu-"+b.btnCount++;c.symbol&&(k=e.symbol(c.symbol,c.symbolX-
i/2,c.symbolY-i/2,i,i).attr(q(m,{"stroke-width":c.symbolStrokeWidth||1,zIndex:1})).add(d));d.add().align(q(c,{width:d.width,x:f.pick(c.x,z)}),!0,"spacingBox");z+=(d.width+c.buttonSpacing)*(c.align==="right"?-1:1);b.exportSVGElements.push(d,k)}},destroyExport:function(a){var a=a.target,b,e;for(b=0;b<a.exportSVGElements.length;b++)if(e=a.exportSVGElements[b])e.onclick=e.ontouchstart=null,a.exportSVGElements[b]=e.destroy();for(b=0;b<a.exportDivElements.length;b++)e=a.exportDivElements[b],B(e,"mouseleave"),
a.exportDivElements[b]=e.onmouseout=e.onmouseover=e.ontouchstart=e.onclick=null,s(e)}});I.menu=function(a,b,e,c){return["M",a,b+2.5,"L",a+e,b+2.5,"M",a,b+c/2+0.5,"L",a+e,b+c/2+0.5,"M",a,b+c-1.5,"L",a+e,b+c-1.5]};A.prototype.callbacks.push(function(a){var b,e=a.options.exporting,c=e.buttons;z=0;if(e.enabled!==!1){for(b in c)a.addButton(c[b]);t(a,"destroy",a.destroyExport)}})});
;
/**
 * SVGInjector v1.1.3 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014-2015 Waybury <hello@waybury.com>
 * @license MIT
 */
!function(t,e){"use strict";function r(t){t=t.split(" ");for(var e={},r=t.length,n=[];r--;)e.hasOwnProperty(t[r])||(e[t[r]]=1,n.unshift(t[r]));return n.join(" ")}var n="file:"===t.location.protocol,i=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),o=Array.prototype.forEach||function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;var r,n=this.length>>>0;for(r=0;n>r;++r)r in this&&t.call(e,this[r],r,this)},a={},l=0,s=[],u=[],c={},f=function(t){return t.cloneNode(!0)},p=function(t,e){u[t]=u[t]||[],u[t].push(e)},d=function(t){for(var e=0,r=u[t].length;r>e;e++)!function(e){setTimeout(function(){u[t][e](f(a[t]))},0)}(e)},v=function(e,r){if(void 0!==a[e])a[e]instanceof SVGSVGElement?r(f(a[e])):p(e,r);else{if(!t.XMLHttpRequest)return r("Browser does not support XMLHttpRequest"),!1;a[e]={},p(e,r);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4===i.readyState){if(404===i.status||null===i.responseXML)return r("Unable to load SVG file: "+e),n&&r("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),r(),!1;if(!(200===i.status||n&&0===i.status))return r("There was a problem injecting the SVG: "+i.status+" "+i.statusText),!1;if(i.responseXML instanceof Document)a[e]=i.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var t;try{var o=new DOMParser;t=o.parseFromString(i.responseText,"text/xml")}catch(l){t=void 0}if(!t||t.getElementsByTagName("parsererror").length)return r("Unable to parse SVG file: "+e),!1;a[e]=t.documentElement}d(e)}},i.open("GET",e),i.overrideMimeType&&i.overrideMimeType("text/xml"),i.send()}},h=function(e,n,a,u){var f=e.getAttribute("data-src")||e.getAttribute("src");if(!/\.svg/i.test(f))return void u("Attempted to inject a file with a non-svg extension: "+f);if(!i){var p=e.getAttribute("data-fallback")||e.getAttribute("data-png");return void(p?(e.setAttribute("src",p),u(null)):a?(e.setAttribute("src",a+"/"+f.split("/").pop().replace(".svg",".png")),u(null)):u("This browser does not support SVG and no PNG fallback was defined."))}-1===s.indexOf(e)&&(s.push(e),e.setAttribute("src",""),v(f,function(i){if("undefined"==typeof i||"string"==typeof i)return u(i),!1;var a=e.getAttribute("id");a&&i.setAttribute("id",a);var p=e.getAttribute("title");p&&i.setAttribute("title",p);var d=[].concat(i.getAttribute("class")||[],"injected-svg",e.getAttribute("class")||[]).join(" ");i.setAttribute("class",r(d));var v=e.getAttribute("style");v&&i.setAttribute("style",v);var h=[].filter.call(e.attributes,function(t){return/^data-\w[\w\-]*$/.test(t.name)});o.call(h,function(t){t.name&&t.value&&i.setAttribute(t.name,t.value)});var g,m,b,y,A,w={clipPath:["clip-path"],"color-profile":["color-profile"],cursor:["cursor"],filter:["filter"],linearGradient:["fill","stroke"],marker:["marker","marker-start","marker-mid","marker-end"],mask:["mask"],pattern:["fill","stroke"],radialGradient:["fill","stroke"]};Object.keys(w).forEach(function(t){g=t,b=w[t],m=i.querySelectorAll("defs "+g+"[id]");for(var e=0,r=m.length;r>e;e++){y=m[e].id,A=y+"-"+l;var n;o.call(b,function(t){n=i.querySelectorAll("["+t+'*="'+y+'"]');for(var e=0,r=n.length;r>e;e++)n[e].setAttribute(t,"url(#"+A+")")}),m[e].id=A}}),i.removeAttribute("xmlns:a");for(var x,S,k=i.querySelectorAll("script"),j=[],G=0,T=k.length;T>G;G++)S=k[G].getAttribute("type"),S&&"application/ecmascript"!==S&&"application/javascript"!==S||(x=k[G].innerText||k[G].textContent,j.push(x),i.removeChild(k[G]));if(j.length>0&&("always"===n||"once"===n&&!c[f])){for(var M=0,V=j.length;V>M;M++)new Function(j[M])(t);c[f]=!0}var E=i.querySelectorAll("style");o.call(E,function(t){t.textContent+=""}),e.parentNode.replaceChild(i,e),delete s[s.indexOf(e)],e=null,l++,u(i)}))},g=function(t,e,r){e=e||{};var n=e.evalScripts||"always",i=e.pngFallback||!1,a=e.each;if(void 0!==t.length){var l=0;o.call(t,function(e){h(e,n,i,function(e){a&&"function"==typeof a&&a(e),r&&t.length===++l&&r(l)})})}else t?h(t,n,i,function(e){a&&"function"==typeof a&&a(e),r&&r(1),t=null}):r&&r(0)};"object"==typeof module&&"object"==typeof module.exports?module.exports=exports=g:"function"==typeof define&&define.amd?define(function(){return g}):"object"==typeof t&&(t.SVGInjector=g)}(window,document);
//# sourceMappingURL=svg-injector.map.js;
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    })
    .service('AOI', function () {
        var AOI;

        AOI = {
            layer: null,
            feature: null,
            ID: null,
            name: null,
            added: false,
            boem: [],
            metadata: [],
            arel: [],
            wind: [],
            disp: [],
            mml: [],
            hydrok: [],
            optLayer: [],
            test: [],
            surfsed: [],
            wavepwr: [],
            tidalpwr:[],
            currentpwr:[],
            beachNur:[],
            OGPlanA:[],

            display: function (AOI_ID) {
                this.ID = AOI_ID;
                this.layer = L.esri.featureLayer({ //AOI poly (7)
                    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
                    color: '#EB660C', weight: 3, fillOpacity: .3,
                    where: "AOI_ID =" + this.ID + "",
                    pane: 'AOIfeature'
                    //simplifyFactor: 5.0,
                    //precision: 2
                }).addTo(map);
                //console.log(" this.layer loaded " + AOI_ID);
                this.isVisible = true;
                //console.log("display: this.ID = " +AOI_ID);
            },
            hide: function () {
                if (this.isVisible) {
                    //map.removeLayer(this.layer);
                    //console.log("hide this.layer  =" + this.ID)
                    map.removeLayer(this.layer);
                    //map.removeLayer(cLayer);
                }
                // probably move this somewhere better.
                map.setView([33.51, -78.3], 6);
                this.isVisible = false;
            },
            zoomTo: function () {

                var mbounds = L.latLngBounds([]);
                // loop through the features returned by the server
                this.layer.eachFeature(function (layer) {
                    // get the bounds of an individual feature
                    var layerBounds = layer.getBounds();
                    // extend the bounds of the collection to fit the bounds of the new feature
                    mbounds.extend(layerBounds);
                });
                map.fitBounds(mbounds);


            },
            isVisible: false,
            loadData: function (AOI_ID, name) {
                // map.removeLayer(cLayer);
                this.display(AOI_ID);
                //this.isVisible = true;
                var myThis = this;
                //console.log("loadData: mythis.ID = " + myThis.ID);
                myThis
                //myThis.zoomTo();
                myThis.name = name;
                myThis.windrpLayer = L.esri.featureLayer({ //wind resource potential (18)
                    url: ortMapServer + ortLayerOptional[0].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/18',
                    pane: 'optionalfeature0',
                    //simplifyFactor: 5.0,
                    //precision: 3,
                    style: function (feature) {
                        if (feature.properties.Speed_90 >= 8.8) {
                            return {color: '#0E3708', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.Speed_90 >= 8.0) {
                            return {color: '#5C9227', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.Speed_90 >= 7.5) {
                            return {color: '#A6C900', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.Speed_90 >= 7.0) {
                            return {color: '#EFCF06', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.Speed_90 >= 6.6) {
                            return {color: '#D96704', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.Speed_90 < 6.6) {
                            return {color: '#A90306', weight: 1, fillOpacity: .8};
                        } else {
                            return {color: 'white', weight: 1, fillOpacity: .8};
                        }
                    }
                });
                // is this really wind leases or all renewable energy leases?
                myThis.windLeaseLayer = L.esri.featureLayer({ //renewable energy leases (17)
                    url: ortMapServer + ortLayerOptional[1].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/17',
                    pane: 'optionalfeature1',
                    style: function (feature) {

                        return {color: 'white', weight: 1, fillOpacity: .5};
                    }
                });
                myThis.windPlanningLayer = L.esri.featureLayer({ //BOEM_Wind_Planning_Areas (21)
                    url: ortMapServer + ortLayerOptional[2].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature2',
                    style: function (feature) {

                        return {color: 'Black', weight: 1, fillOpacity: .5};
                    }
                });
                myThis.oceanDisposalSites = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[3].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature3',
                    style: function (feature) {
                        return {fillColor: '#FFA7A7', color: '#4A4A4A', weight: 1.5, fillOpacity: .5};
                    }
                });
                myThis.marineMineralsLeases = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[4].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature4',
                    style: function (feature) {
                        return {color: '#7300D9', weight: 4, fillOpacity: 0};
                    }
                });
                //there is no 5 yet

                myThis.HydrokineticLeases = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[6].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature6',
                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: 'img/HydrokineticLeasesGraphic.svg',
                                iconSize: [32, 37],
                                iconAnchor: [16, 37],
                                popupAnchor: [0, -28]
                            }),
                        });
                    }
                });
                //there is no 7 yet
                myThis.wavePower = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[8].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature8',
                    style: function (feature) {
                        if (feature.properties.ann_wef > 40) {
                            return {color: '#B0B497', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 30.0) {
                            return {color: '#B6BC9E', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 20.0) {
                            return {color: '#BBC1A4', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 15.0) {
                            return {color: '#C0C6A8', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 10.0) {
                            return {color: '#C9D0B1', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 8.0) {
                            return {color: '#D0D8B9', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 6) {
                            return {color: '#D5DDC0', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 4.0) {
                            return {color: '#DEE7C9', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef > 2.0) {
                            return {color: '#E4EFD2', weight: 1, fillOpacity: .8};
                        } else if (feature.properties.ann_wef < 2.01) {
                            return {color: '#EBF6D8', weight: 1, fillOpacity: .8};
                        } else {
                            return {color: 'white', weight: 1, fillOpacity: .8};
                        }
                    }
                });

                myThis.tidalPower = L.esri.dynamicMapLayer({
                    url: ortMapServer,
                    pane: 'optionalfeature9',
                    layers:[ortLayerOptional[9].num],
                    opacity:.8,
                });
                myThis.currentPower = L.esri.dynamicMapLayer({
                    url: ortMapServer,
                    pane: 'optionalfeature10',
                    layers:[ortLayerOptional[10].num],
                    opacity:.8,
                });

                myThis.beachNourish = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[11].num,
                    pane: 'optionalfeature11',
                    style: function (feature) {
                        return {color: '#8B572A', weight: 4, fillOpacity: 0};
                    }
                });
                // var cMapLayer1 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/33';

                var query = L.esri.query({
                    url: ortMapServer + ortLayerData
                });


                query.returnGeometry(false).where("AOI_ID =" + myThis.ID + "").run(function (error, featureCollection, response) {

                    var k = 0;
                    var ba = 0;
                    var bb = 0;
                    var bc = 0;
                    var bd = 0;
                    var be = 0;
                    var bf = 0;
                    var bg = 0;
                    var bh = 0;
                    var bi = 0;
                    var bj = 0;
                    var bk = 0;
                    var bl = 0;
                    var bm = 0;

                    for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                        switch (featureCollection.features[i].properties.DATASET_NM) {
                            case "OilandGasPlanningAreas":
                                myThis.OGPlanA[bm] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    Region:(featureCollection.features[i].properties.Region|| 'unknown')

                                };

                                if ( (bm === 0) &&(featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bm++;
                                break;
                            case "SC_BeachProjects":
                                myThis.beachNur[bl] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    BEACH_AREA:(featureCollection.features[i].properties.BEACH_AREA|| 'unknown'),
                                    YEAR: (featureCollection.features[i].properties.YEAR || '0'),
                                    SAND_VOL_C: (featureCollection.features[i].properties.SAND_VOL_C || '0'),
                                    Dist_Mi:((featureCollection.features[i].properties.Dist_Mi === ' ') ? '0' : featureCollection.features[i].properties.Dist_Mi )
                                };

                                if ( (bl === 0) &&(featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bl++;
                                break;
                            case "us_oc_ms":
                                myThis.currentpwr[bk] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    AVG_OCEAN_CURRENT:(featureCollection.features[i].properties.AVG_OCEAN_CURRENT|| 0),
                                    SUITABILITY_OCEAN_SPEED: (featureCollection.features[i].properties.SUITABILITY_OCEAN_SPEED || 'NO')
                                };

                                if ( (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bk++;
                                break;
                            case "usa_mc_wm":
                                myThis.tidalpwr[bj] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    AVG_TIDAL_CURRENT:(featureCollection.features[i].properties.AVG_TIDAL_CURRENT|| 0),
                                    SUITABILITY_TIDAL_DEPTH: (featureCollection.features[i].properties.SUITABILITY_TIDAL_DEPTH || 'NO'),
                                    SUITABILITY_TIDAL_AREA: (featureCollection.features[i].properties.SUITABILITY_TIDAL_AREA || 'NO'),
                                    SUITABILITY_TIDAL_SPEED: (featureCollection.features[i].properties.SUITABILITY_TIDAL_SPEED || 'NO')
                                };

                                if ( (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bj++;
                                break;
                            case "OceanWaveResourcePotential":
                                myThis.wavepwr[bi] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    AVG_WAVE_POWER:(featureCollection.features[i].properties.AVG_WAVE_POWER|| 0),
                                    SUITABILITY_OCEAN_POWER: (featureCollection.features[i].properties.SUITABILITY_OCEAN_POWER || 'Unknown')
                                };
                                //console.log(myThis.wavepwr[bi].COLOR);
                                if ( (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bi++;
                                break;

                            case "OceanDisposalSites":
                                myThis.disp[be] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    PRIMARY_USE: (featureCollection.features[i].properties.primaryUse || 'Unknown')
                                };

                                if ((be === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                be++;
                                break;
                            case "MarineHydrokineticProjects":
                                if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
                                    myThis.hydrok[bg] = {
                                        TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                        PRIMARY_USE: (featureCollection.features[i].properties.energyType ) + ' projects'
                                    };
                                }
                                if ((bg === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;
                                //console.log("hydrok "+myThis.hydrok);
                                bg++;

                                break;
                            case "ecstdb2014":
                                if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
                                    myThis.surfsed[bh] = {
                                        TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                        PRIMARY_USE: ((featureCollection.features[i].properties.CLASSIFICA === ' ') ? 'Unknown' : featureCollection.features[i].properties.CLASSIFICA )
                                    };
                                }
                                if ((bh === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bh++;

                                break;

                            case "Sand_n_GravelLeaseAreas": //aka Marine Minerals Leases
                                myThis.mml[bf] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0)
                                    //PRIMARY_USE: (featureCollection.features[i].properties.primaryUse || 'Unknown')
                                };

                                if ((bf === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bf++;
                                break;

                            case "TribalLands":
                                myThis.test[bd] = {
                                    Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
                                    Company: featureCollection.features[i].properties.Company,
                                    INFO: featureCollection.features[i].properties.INFO,
                                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                    LINK1: featureCollection.features[i].properties.LINK1,
                                    LINK2: featureCollection.features[i].properties.LINK2,
                                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
                                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((bd === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bd++;
                                break;


                            case  "BOEM_Wind_Planning_Areas":
                                myThis.boem[ba] = {
                                    INFO: featureCollection.features[i].properties.INFO,
                                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                    LINK1: featureCollection.features[i].properties.LINK1,
                                    LINK2: featureCollection.features[i].properties.LINK2,
                                    PERC_COVER: featureCollection.features[i].properties.PERC_COVER,
                                    TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC,
                                    TOTAL_CNT: featureCollection.features[i].properties.TOTAL_CNT,
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((ba === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    // console.log(myThis.metadata[k]);
                                    k++;

                                }
                                ;
                                ba++;
                                break;
                            case "ActiveRenewableEnergyLeases":
                                myThis.arel[bc] = {
                                    Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
                                    Company: featureCollection.features[i].properties.Company,
                                    INFO: featureCollection.features[i].properties.INFO,
                                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                    LINK1: featureCollection.features[i].properties.LINK1,
                                    LINK2: featureCollection.features[i].properties.LINK2,
                                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
                                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((bc === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bc++;
                                break;
                            case  "WindResourcePotential":
                                myThis.wind[bb] = {
                                    WIND_CLASS: (featureCollection.features[i].properties.WIND_CLASS),
                                    AVG_WGHT: (featureCollection.features[i].properties.AVG_WGHT || 0).toFixed(2),
                                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
                                    HOUSES_SUM: (featureCollection.features[i].properties.HOUSES_SUM || 0).toLocaleString(),
                                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((bb === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
                                    switch (featureCollection.features[i].properties.WIND_CLASS.substring(0, 3)) {
                                        case "Sup":
                                            windclass[0] = featureCollection.features[i].properties.PERC_COVER;
                                            break;
                                        case "Out":
                                            windclass[1] = featureCollection.features[i].properties.PERC_COVER;
                                            break;
                                        case "Exc":
                                            windclass[2] = featureCollection.features[i].properties.PERC_COVER;
                                            break;
                                        case "Goo":
                                            windclass[3] = featureCollection.features[i].properties.PERC_COVER;
                                            break;
                                        case "Fai":
                                            windclass[4] = featureCollection.features[i].properties.PERC_COVER;
                                            break;
                                        case "Uns":
                                            windclass[5] = featureCollection.features[i].properties.PERC_COVER;
                                            break;
                                    }

                                }
                                bb++;
                                break;
                        }
                    }
                    console.log(myThis.metadata);
                   //console.log(bh);
                    //myThis.wavepwr[0].AVG_WAVE_POWER=50;
                   // myThis.tidalpwr[0].AVG_TIDAL_CURRENT=1.01;
                    //myThis.tidalpwr[0].SUITABILITY_TIDAL_DEPTH="YES";
                   // myThis.tidalpwr[0].SUITABILITY_TIDAL_AREA="YES";
                   // myThis.currentpwr[0].AVG_OCEAN_CURRENT=1;
                   // myThis.currentpwr[0].SUITABILITY_TIDAL_AREA="YES";


                        if (myThis.wavepwr[0].AVG_WAVE_POWER > 40) {
                            myThis.wavepwr[0].COLOR= '#B0B497';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 30.0) {
                            myThis.wavepwr[0].COLOR= '#B6BC9E';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 20.0) {
                            myThis.wavepwr[0].COLOR= '#BBC1A4';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 15.0) {
                            myThis.wavepwr[0].COLOR= '#C0C6A8';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 10.0) {
                            myThis.wavepwr[0].COLOR= '#C9D0B1';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 8.0) {
                            myThis.wavepwr[0].COLOR= '#D0D8B9';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 6) {
                            myThis.wavepwr[0].COLOR= '#D5DDC0';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 4.0) {
                            myThis.wavepwr[0].COLOR= '#DEE7C9';
                            //console.log("color");
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 2.0) {
                            myThis.wavepwr[0].COLOR= '#E4EFD2';
                        } else if (myThis.wavepwr[0].AVG_WAVE_POWER < 2.01) {
                            myThis.wavepwr[0].COLOR= '#EBF6D8';
                        } else {
                            myThis.wavepwr[0].COLOR= 'white';
                        }

                    windclass[6] = (windclass.reduce(function (prev, cur) {
                        return prev.toFixed(2) - cur.toFixed(2);
                    }, 100));
                    if (myThis.boem[0] == null) {
                        myThis.boem[0] = {
                            INFO: "NA",
                            PROT_NUMBE: 0,
                            LINK1: "NA",
                            LINK2: "NA",
                            PERC_COVER: 0,
                            TOTAL_BLOC: 0,
                            TOTAL_CNT: 0
                        };
                    }
                    if (myThis.arel[0] == null) {
                        myThis.arel[0] = {
                            Lease_Numb: 0,
                            Company: "NA",
                            INFO: "NA",
                            PROT_NUMBE: 0,
                            LINK1: "NA",
                            LINK2: "NA",
                            PERC_COVER: 0,
                            TOTAL_BLOC: 0,
                            TOTAL_CNT: 0
                        };
                    }
                    myThis.boem.sort(function (a, b) {
                        return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                    });
                    myThis.arel.sort(function (a, b) {
                        return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                    });

                    if (myThis.boem[0].TOTAL_CNT === 0) {
                        myThis.boem[0].PERC_COVER = 0;
                        myThis.boem[0].TOTAL_BLOC = 0;
                    }
                    if (myThis.arel[0] == null)myThis.arel[0].TOTAL_CNT = 0;
                    if (myThis.arel[0].TOTAL_CNT === 0) {
                        myThis.arel[0].PERC_COVER = 0;
                        myThis.arel[0].TOTAL_BLOC = 0;
                    }
                });
                myThis.isLoaded = true;

            },
            unloadData: function () {
                if (this.isLoaded) {
                    map.removeLayer(this.oceanDisposalSites);
                    map.removeLayer(this.HydrokineticLeases);
                    map.removeLayer(this.windPlanningLayer);
                    map.removeLayer(this.windLeaseLayer);
                    map.removeLayer(this.windrpLayer);
                    map.removeLayer(this.marineMineralsLeases);
                    map.removeLayer(this.wavePower);
                    map.removeLayer(this.tidalPower);
                    map.removeLayer(this.currentPower);
                    map.removeLayer(this.beachNourish);
                    //map.removeLayer(cLayer);
                    this.windLeaseLayerIsVisible = false;
                    this.windrpLayerIsVisible = false;
                    this.windPlanningLayerIsVisible = false;
                    this.oceanDisposalSitesIsVisible = false;
                    this.marineMineralsLeases = false;
                    this.HydrokineticLeasesIsVisible = false;
                    this.wavePowerIsVisable = false;
                    this.tidalPowerIsVisable = false;
                    this.currentPowerIsVisable = false;
                    this.beachNourishIsVisable = false;
                    this.wind.length = 0;
                    this.boem.length = 0;
                    this.metadata.length = 0;
                    this.optLayer.length = 0;
                    windclass.length = 0;
                    this.disp.length = 0;
                    this.mml.length = 0;
                    this.hydrok.length = 0;
                    this.test.length = 0;
                    this.surfsed.length = 0;
                    this.wavepwr.length = 0;
                    this.tidalpwr.length = 0;
                    this.currentpwr.length = 0;
                    this.beachNur.length = 0;
                    this.OGPlanA.length = 0;

                    this.hide();
                    //map.setView([33.51, -68.3], 6);
                }
                this.isLoaded = false;
            },
            isLoaded: false,
            windLeaseLayerIsVisible: false,
            toggleWindLeaseLayer: function () {
                if (!this.windLeaseLayerIsVisible) {
                    this.windLeaseLayer.addTo(map);
                    this.windLeaseLayerIsVisible = true;
                } else {
                    map.removeLayer(this.windLeaseLayer);
                    this.windLeaseLayerIsVisible = false;
                }
            },
            windPlanningLayerIsVisible: false,
            toggleWindPlanningLayer: function () {
                if (!this.windPlanningLayerIsVisible) {
                    this.windPlanningLayer.addTo(map);
                    this.windPlanningLayerIsVisible = true;
                } else {
                    map.removeLayer(this.windPlanningLayer);
                    this.windPlanningLayerIsVisible = false;
                }
            },
            oceanDisposalSitesIsVisible: false,
            toggleOceanDisposalSites: function () {
                if (!this.oceanDisposalSitesIsVisible) {
                    this.oceanDisposalSites.addTo(map);
                    this.oceanDisposalSitesIsVisible = true;
                } else {
                    map.removeLayer(this.oceanDisposalSites);
                    this.oceanDisposalSitesIsVisible = false;
                }
            },
            HydrokineticLeasesIsVisible: false,
            toggleHydrokineticLeases: function () {
                if (!this.HydrokineticLeasesIsVisible) {
                    this.HydrokineticLeases.addTo(map);
                    this.HydrokineticLeasesIsVisible = true;
                } else {
                    map.removeLayer(this.HydrokineticLeases);
                    this.HydrokineticLeasesIsVisible = false;
                }
            },

            marineMineralsLeasesIsVisable: false,
            toggleMarineMineralsLeases: function () {
                if (!this.marineMineralsLeasesIsVisable) {
                    this.marineMineralsLeases.addTo(map);
                    this.marineMineralsLeasesIsVisable = true;
                } else {
                    map.removeLayer(this.marineMineralsLeases);
                    this.marineMineralsLeasesIsVisable = false;
                }
            },
            wavePowerIsVisable: false,
            togglewavePower: function () {
                if (!this.wavePowerIsVisable) {
                    this.wavePower.addTo(map);
                    this.wavePowerIsVisable = true;
                } else {
                    map.removeLayer(this.wavePower);
                    this.wavePowerIsVisable = false;
                }
            },
            tidalPowerIsVisable: false,
            toggletidalPower: function () {
                if (!this.tidalPowerIsVisable) {
                    this.tidalPower.addTo(map);
                    this.tidalPowerIsVisable = true;
                } else {
                    map.removeLayer(this.tidalPower);
                    this.tidalPowerIsVisable = false;
                }
            },
            currentPowerIsVisable: false,
            togglecurrentPower: function () {
                if (!this.currentPowerIsVisable) {
                    this.currentPower.addTo(map);
                    this.currentPowerIsVisable = true;
                } else {
                    map.removeLayer(this.currentPower);
                    this.currentPowerIsVisable = false;
                }
            },
            beachNourishIsVisable: false,
            togglebeachNourish: function () {
                if (!this.beachNourishIsVisable) {
                    this.beachNourish.addTo(map);
                    this.beachNourishIsVisable = true;
                } else {
                    map.removeLayer(this.beachNourish);
                    this.beachNourishIsVisable = false;
                }
            },

            windrpLayerIsVisible: false,
            toggleWindrpLayer: function () {
                if (!this.windrpLayerIsVisible) {
                    this.windrpLayer.addTo(map);
                    this.windrpLayerIsVisible = true;
                } else {
                    map.removeLayer(this.windrpLayer);
                    this.windrpLayerIsVisible = false;
                }
            }
        };

        return AOI;
    });
;
'use strict';


angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function ($scope, metaurl, close) {

        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };

    })

    .controller('AOICtrl', ['AOI', '$scope', function (AOI, $scope) {
        $scope.AOI = AOI;
        // AOIData.name = 'test name';
        // this would be where we need to load the AOI, all of it.
        //$scope.name = "AOICtrl";

        // map.setView([33.51, -78.3], 10); //this is specific to Grand Strand


        //-----------------------------

        //if (! $scope.AOI.layer) {
            //cLayer = L.esri.featureLayer({ //AOI poly (7)
            //    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
            //    //where: "AOI_NAME='" + $scope.Cur_AOI + "'",
            //    where: "AOI_ID =" + $scope.AOI.ID + "",
            //    color: '#EB660C', weight: 3, fillOpacity: .3,
            //    pane: 'AOIfeature',
            //
            //    //            simplifyFactor: 5.0,
            //    //            precision: 2,
            //}).addTo(map);
            //console.log(" cLayer loaded " + $scope.AOI.ID);

            AOI.layer.on("load", function (evt) {
                // create a new empty Leaflet bounds object

                var mbounds = L.latLngBounds([]);
                // loop through the features returned by the server
                AOI.layer.eachFeature(function (layer) {
                    // get the bounds of an individual feature
                    var layerBounds = layer.getBounds();
                    // extend the bounds of the collection to fit the bounds of the new feature
                    mbounds.extend(layerBounds);
                });
                map.fitBounds(mbounds);

                //console.log(mbounds);
                // unwire the event listener so that it only fires once when the page is loaded
                AOI.layer.off('load');
                $scope.mout($scope.AOI.ID);
            });
        //};

        //-----------------------------------

        //windrpLayer = L.esri.featureLayer({ //wind resource potential (18)
        //    url: ortMapServer + ortLayerOptional[0].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/18',
        //    pane: 'optionalfeature1',
        //    //simplifyFactor: 5.0,
        //    //precision: 3,
        //    style: function (feature) {
        //        if (feature.properties.Speed_90 >= 8.8) {
        //            return {color: '#0E3708', weight: 1, fillOpacity: .8};
        //        } else if (feature.properties.Speed_90 >= 8.0) {
        //            return {color: '#5C9227', weight: 1, fillOpacity: .8};
        //        } else if (feature.properties.Speed_90 >= 7.5) {
        //            return {color: '#A6C900', weight: 1, fillOpacity: .8};
        //        } else if (feature.properties.Speed_90 >= 7.0) {
        //            return {color: '#EFCF06', weight: 1, fillOpacity: .8};
        //        } else if (feature.properties.Speed_90 >= 6.6) {
        //            return {color: '#D96704', weight: 1, fillOpacity: .8};
        //        } else if (feature.properties.Speed_90 < 6.6) {
        //            return {color: '#A90306', weight: 1, fillOpacity: .8};
        //        } else {
        //            return {color: 'white', weight: 1, fillOpacity: .8};
        //        }
        //    }
        //});
        //
        //windLeaseLayer = L.esri.featureLayer({ //renewable energy leases (17)
        //    url: ortMapServer + ortLayerOptional[1].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/17',
        //    pane: 'optionalfeature2',
        //    style: function (feature) {
        //
        //        return {color: 'white', weight: 1, fillOpacity: .5};
        //    }
        //});
        //windPlanningLayer = L.esri.featureLayer({ //BOEM_Wind_Planning_Areas (21)
        //    url: ortMapServer + ortLayerOptional[2].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
        //    pane: 'optionalfeature3',
        //    style: function (feature) {
        //
        //        return {color: 'Black', weight: 1, fillOpacity: .5};
        //    }
        //});
        //oceanDisposalSites = L.esri.featureLayer({ //BOEM_Wind_Planning_Areas (21)
        //    url: ortMapServer + ortLayerOptional[3].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
        //    pane: 'optionalfeature4',
        //    style: function (feature) {
        //
        //        return {color: 'Black', weight: 1, fillOpacity: .5};
        //    }
        //});
        //
        //
        //// var cMapLayer1 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/33';
        //
        //var query = L.esri.query({
        //    url: ortMapServer + ortLayerData,
        //
        //});
        //
        //
        //query.returnGeometry(false).where("AOI_ID =" + $scope.AOI_ID + "").run(function (error, featureCollection, response) {
        //
        //    var k = 0;
        //    var ba = 0;
        //    var bb = 0;
        //    var bc = 0;
        //    var bd = 0;
        //    var be = 0;
        //
        //    for (var i = 0, j = featureCollection.features.length; i < j; i++) {
        //
        //        switch (featureCollection.features[i].properties.DATASET_NM) {
        //            case "OceanDisposalSites":
        //                $scope.disp[be] = {
        //                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
        //                    PRIMARY_USE: (featureCollection.features[i].properties.primaryUse || 'Unknown')
        //                };
        //
        //                if ((be === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
        //                    $scope.metadata[k] = {
        //                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
        //                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
        //                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
        //                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
        //                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
        //                    };
        //                    k++;
        //                }
        //                ;
        //
        //                be++;
        //                break;
        //            case "TribalLands":
        //                $scope.test[bd] = {
        //                    Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
        //                    Company: featureCollection.features[i].properties.Company,
        //                    INFO: featureCollection.features[i].properties.INFO,
        //                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
        //                    LINK1: featureCollection.features[i].properties.LINK1,
        //                    LINK2: featureCollection.features[i].properties.LINK2,
        //                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
        //                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
        //                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
        //                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
        //                };
        //                if ((bd === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
        //                    $scope.metadata[k] = {
        //                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
        //                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
        //                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
        //                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
        //                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
        //                    };
        //                    k++;
        //                }
        //                ;
        //
        //                bd++;
        //                break;
        //
        //
        //            case  "BOEM_Wind_Planning_Areas":
        //                $scope.boem[ba] = {
        //                    INFO: featureCollection.features[i].properties.INFO,
        //                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
        //                    LINK1: featureCollection.features[i].properties.LINK1,
        //                    LINK2: featureCollection.features[i].properties.LINK2,
        //                    PERC_COVER: featureCollection.features[i].properties.PERC_COVER,
        //                    TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC,
        //                    TOTAL_CNT: featureCollection.features[i].properties.TOTAL_CNT,
        //                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
        //                };
        //                if ((ba === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
        //                    $scope.metadata[k] = {
        //                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
        //                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
        //                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
        //                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
        //                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
        //                    };
        //                    // console.log($scope.metadata[k]);
        //                    k++;
        //
        //                }
        //                ;
        //                ba++;
        //                break;
        //            case "ActiveRenewableEnergyLeases":
        //                $scope.arel[bc] = {
        //                    Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
        //                    Company: featureCollection.features[i].properties.Company,
        //                    INFO: featureCollection.features[i].properties.INFO,
        //                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
        //                    LINK1: featureCollection.features[i].properties.LINK1,
        //                    LINK2: featureCollection.features[i].properties.LINK2,
        //                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
        //                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
        //                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
        //                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
        //                };
        //                if ((bc === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
        //                    $scope.metadata[k] = {
        //                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
        //                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
        //                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
        //                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
        //                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
        //                    };
        //                    k++;
        //                }
        //                ;
        //
        //                bc++;
        //                break;
        //            case  "WindResourcePotential":
        //                $scope.wind[bb] = {
        //                    WIND_CLASS: (featureCollection.features[i].properties.WIND_CLASS),
        //                    AVG_WGHT: (featureCollection.features[i].properties.AVG_WGHT || 0).toFixed(2),
        //                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
        //                    HOUSES_SUM: (featureCollection.features[i].properties.HOUSES_SUM || 0).toLocaleString(),
        //                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
        //                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
        //                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
        //                };
        //                if ((bb === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
        //                    $scope.metadata[k] = {
        //                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
        //                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
        //                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
        //                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
        //                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
        //                    };
        //                    k++;
        //                }
        //                ;
        //
        //                if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
        //                    switch (featureCollection.features[i].properties.WIND_CLASS.substring(0, 3)) {
        //                        case "Sup":
        //                            windclass[0] = featureCollection.features[i].properties.PERC_COVER;
        //                            break;
        //                        case "Out":
        //                            windclass[1] = featureCollection.features[i].properties.PERC_COVER;
        //                            break;
        //                        case "Exc":
        //                            windclass[2] = featureCollection.features[i].properties.PERC_COVER;
        //                            break;
        //                        case "Goo":
        //                            windclass[3] = featureCollection.features[i].properties.PERC_COVER;
        //                            break;
        //                        case "Fai":
        //                            windclass[4] = featureCollection.features[i].properties.PERC_COVER;
        //                            break;
        //                        case "Uns":
        //                            windclass[5] = featureCollection.features[i].properties.PERC_COVER;
        //                            break;
        //                    }
        //
        //                }
        //                bb++;
        //                break;
        //        }
        //    }
        //
        //    if ($scope.boem[0] == null) {
        //        $scope.boem[0] = {
        //            INFO: "NA",
        //            PROT_NUMBE: 0,
        //            LINK1: "NA",
        //            LINK2: "NA",
        //            PERC_COVER: 0,
        //            TOTAL_BLOC: 0,
        //            TOTAL_CNT: 0
        //        };
        //    }
        //    if ($scope.arel[0] == null) {
        //        $scope.arel[0] = {
        //            Lease_Numb: 0,
        //            Company: "NA",
        //            INFO: "NA",
        //            PROT_NUMBE: 0,
        //            LINK1: "NA",
        //            LINK2: "NA",
        //            PERC_COVER: 0,
        //            TOTAL_BLOC: 0,
        //            TOTAL_CNT: 0
        //        };
        //    }
        //    $scope.boem.sort(function (a, b) {
        //        return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
        //    });
        //    $scope.arel.sort(function (a, b) {
        //        return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
        //    });
        //
        //    if ($scope.boem[0].TOTAL_CNT === 0) {
        //        $scope.boem[0].PERC_COVER = 0;
        //        $scope.boem[0].TOTAL_BLOC = 0;
        //    }
        //    if ($scope.arel[0] == null)$scope.arel[0].TOTAL_CNT = 0;
        //    if ($scope.arel[0].TOTAL_CNT === 0) {
        //        $scope.arel[0].PERC_COVER = 0;
        //        $scope.arel[0].TOTAL_BLOC = 0;
        //    }
        //    $scope.$apply();
        //});
        //}


        //-------------------------------


    }])


    .controller('MyCtrl2', ['$scope', '$timeout', 'AOI', '$http', function ($scope, $timeout, AOI, $http) {
        $scope.AOI = AOI;
        var smallmap;
        $scope.name = "controller 2";
        $http.get('emconfig.json')
            .then(function (res) {
                $scope.emconfig = res.data;
            });
        /*//over ride windclass for testing chart
         console.log(windclass[0]);
         windclass[0]=10;
         windclass[1]=25;
         windclass[2]=65;
         */
        //console.log("windclass " + windclass);
 //      windclass[6] = (windclass.reduce(function (prev, cur) {
 //           return prev.toFixed(2) - cur.toFixed(2);
 //       }, 100));
        //console.log("windmill % unknown = " + windclass[6]);
        $scope.$on('$viewContentLoaded', function () {
            // Your document is ready, place your code here
            $timeout(function () {
                windChart = Highcharts.chart('container', {
                    chart: {
                        spacing: 0,
                        margin: 0,
                        type: 'column'
                    },
                    title: {
                        text: null
                    },
                    exporting: {enabled: false},
                    colors: ['#0E3708', '#5C9227', '#A6C900', '#EFCF06', '#D96704', '#A90306', '#A1A1A1'],
                    xAxis: {
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false
                        },
                        tickLength: 0
                    },
                    yAxis: {
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false
                        },
                        TickLength: 0
                    },
                    plotOptions: {
                        series: {
                            pointWidth: 190
                        },
                        column: {
                            stacking: 'percent'
                        }
                    },
                    series: [{
                        showInLegend: false,
                        name: '',
                        data: [windclass[0]]
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[1]]
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[2]]
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[3]]
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[4]]
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[5]]
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[6]]
                    }
                    ]
                });

                /*  //over ride windclass for testing chart
                 // console.log(windclass[0]);
                 windclass[0]=10;
                 windclass[1]=25;
                 windclass[2]=65;
                 */

                smallmap = L.map('map').setView([45.526, -122.667], 1);
                L.esri.basemapLayer('Oceans').addTo(smallmap);
                L.esri.basemapLayer('OceansLabels').addTo(smallmap);
                //console.log("AOI_ID =" + $scope.AOI.ID + "");

                var minicLayer = L.esri.featureLayer({
                    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
                    where: "AOI_ID =" + $scope.AOI.ID + "",
                    color: '#EB660C',
                    weight: 3,
                    fillOpacity: .3,
                    //simplifyFactor: 5.0,
                    //precision: 3
                    //,            pane: 'miniAOIfeature'
                }).addTo(smallmap);
               // console.log(" minicLayer loaded " + $scope.AOI.ID);
                minicLayer.on("load", function (evt) {
                    // create a new empty Leaflet bounds object

                    var bounds = L.latLngBounds([]);
                    // loop through the features returned by the server
                    minicLayer.eachFeature(function (layer) {
                        // get the bounds of an individual feature

                        var layerBounds = layer.getBounds();
                        // extend the bounds of the collection to fit the bounds of the new feature
                        bounds.extend(layerBounds);
                    });

                    // once we've looped through all the features, zoom the map to the extent of the collection
                    $scope.minibounds = bounds;
                    smallmap.fitBounds(bounds);


                    // unwire the event listener so that it only fires once when the page is loaded
                    minicLayer.off('load');
                });
                //smallmap.invalidateSize();

            }, 1000);
        });
        /*
         $scope.layers_toggle = (toggle ? "Click to hide Layer" : "Click to view on Map");
         document.getElementById("windRSel").addEventListener("click", function () {
         toggle = !toggle;
         if (toggle) {
         windrpLayer.addTo(map);
         windLeaseLayer.addTo(map);
         windPlanningLayer.addTo(map);
         //windrpLayer.setOpacity(.1);
         //windrpLayer.bringToBack();
         document.getElementById("layerviewlink").innerHTML = "Click to hide Layer";

         } else {
         map.removeLayer(windPlanningLayer);
         map.removeLayer(windLeaseLayer);
         map.removeLayer(windrpLayer);

         document.getElementById("layerviewlink").innerHTML = "Click to view on Map";
         }
         });
         */
        document.getElementById("togglefull").addEventListener("click", function () {
            toggleFull = !toggleFull;
            $scope.toggleFull = toggleFull;
            if (toggleFull) {


                document.getElementById("slide1").style.width = '100%';
                //document.getElementById("slide1").style.position = 'absolute';

                document.getElementById("togglefull").style.marginLeft = '0px';
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(180deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(180deg)";
                document.getElementById("togglefull").style.transform = "rotate(180deg)";

                //document.getElementById('AOItab2').style.display = 'block';
                var elems = document.getElementsByClassName('AOItabClass2');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.display = 'inline-block';
                }
                ;
                var elems = document.getElementsByClassName('sliderbutton');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.visibility = "hidden";
                }
                ;
                smallmap.invalidateSize();
                smallmap.fitBounds($scope.minibounds);
                //document.getElementById('slider_but0').style.visibility = "hidden";
                //document.getElementById('slider_but1').style.visibility = "hidden";
                //document.getElementById('slider_but2').style.visibility = "hidden";
                document.getElementById('slbuttxt0').style.visibility = "hidden";
            } else {
                //document.getElementById('smallmap').style.visibility = "hidden";
                document.getElementById("togglefull").style.marginLeft = "-25px";
                //.style.marginLeft='-25px';
                document.getElementById("slide1").style.width = '50%';
                //document.getElementById("slide1").style.position = 'relative';
                //document.getElementById('AOItab2').style.display = 'none';
                var elems = document.getElementsByClassName('AOItabClass2');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.display = 'none';
                }
                ;
                var elems = document.getElementsByClassName('sliderbutton');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.visibility = "visible";
                }
                ;
                // document.getElementById('AOItab2').style.height='0px';
                // document.getElementById('slider_but0').style.visibility = "visible";
                // document.getElementById('slider_but1').style.visibility = "visible";
                // document.getElementById('slider_but2').style.visibility = "visible";
                document.getElementById('slbuttxt0').style.visibility = "visible";
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(0deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(0deg)";
                document.getElementById("togglefull").style.transform = "rotate(0deg)";

            }
        });


    }])

    .controller('pageslideCtrl', ['$scope', 'AOI', function ($scope, AOI) { //this one loads once on start up
        $scope.AOI = AOI;

        $scope.box = [];
//        $scope.menuitems = [];
//        $scope.optLayer = [];
       var len = 2000;
       for (var i = 0; i < len; i++) {
           $scope.box.push({
               myid: i,
               isActive: false,
                level: 0,
                future: true
            });
        }


        //$scope.name = "bababooey";
        $scope.checked = true; // This will be binded using the ps-open attribute


        $scope.toggle = function () { //toggles slider pane but does nothing about the AOI
            $scope.checked = !$scope.checked;
        };

        $scope.t_menu_box = function (id, levl) {
            $scope.box[id].level = levl;

            $scope.box[id].isActive = !$scope.box[id].isActive;
            for (i = 0; i < len; i++) {
                if ((i != id) && (levl <= $scope.box[i].level)) {
                    $scope.box[i].isActive = false;
                }
            }
            //console.log($scope.box[id].myid + " "+id+" is " +$scope.box[id].isActive);
        };

        //$scope.opt_layer_button = function (id) {
        //    $scope.optLayer[id] = !$scope.optLayer[id];
        //    //console.log("button " + id);
        //    switch (id) {
        //        case 0:
        //            if ($scope.optLayer[0]) {
        //                windrpLayer.addTo(map);
        //            } else map.removeLayer(windrpLayer);
        //            break;
        //        case 1:
        //            if ($scope.optLayer[1]) {
        //                windLeaseLayer.addTo(map);
        //            } else map.removeLayer(windLeaseLayer);
        //            break;
        //        case 2:
        //            if ($scope.optLayer[2]) {
        //                windPlanningLayer.addTo(map);
        //            } else map.removeLayer(windPlanningLayer);
        //            break;
        //        case 3:
        //            if ($scope.optLayer[3]) {
        //                oceanDisposalSites.addTo(map);
        //            } else map.removeLayer(oceanDisposalSites);
        //            break;
        //    }
        //
        //
        //};


        $scope.reset = function () { //unloads AOI but leaves slider pane on
            $scope.AOIoff();
            $scope.paneon();
            AOI.unloadData();
            for (i = 0; i < len; i++) {
                $scope.box[i].isActive = false;
            }

        };

        $scope.off = function () { //unloads AOI and turns off slider pane
            $scope.AOIoff();
            $scope.paneoff();
        };

        $scope.on = function (AOI, AOI_id) {//turns on AOI and slider pane
            $scope.AOIon();
            $scope.paneon();
            //console.log(AOI);
            //$scope.Cur_AOI = AOI;
            //$scope.AOI_ID = AOI_id;


            //console.log($scope.AOI_ID);
        };

        $scope.mover = function (AOI_id) {//turns on poly on mouse over in menu

            if (!mouseLayer) {
                mouseLayer = L.esri.featureLayer({ //AOI poly (7)
                    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
                    //where: "AOI_NAME='" + $scope.Cur_AOI + "'",
                    where: "AOI_ID =" + AOI_id + "",
                    color: '#EB660C', weight: 3, fillOpacity: .3,
                    //pane: 'AOIfeature',
                    simplifyFactor: 2.0,
                   // precision: 2
                }).addTo(map);
                //console.log(" mouseLayer loaded " + AOI_id);
            }
            ;

            // console.log(AOI_id);

        };
        $scope.mout = function (AOI_id) {//turns on poly on mouse over in menu

            if (mouseLayer) {
                map.removeLayer(mouseLayer);
                mouseLayer = null;
                //console.log(" mouseLayer UNloaded " + AOI_id);
            }
            //console.log("mouselayer = " + mouseLayer )
            // console.log(AOI_id);

        };

        $scope.AOIoff = function () {
            // there is probably a better place for this
            toggle = false;
        };

        $scope.AOIon = function () {
            $scope.checkifAOI = true;
        };

        $scope.paneoff = function () {
            $scope.checked = false;
            toggleFull = false;
        };

        $scope.paneon = function () {
            $scope.checked = true;
            document.getElementById("slide1").style.width = '50%';
            toggleFull = false;
        };

        //$scope.Cur_AOI = 'Grand Strand';

       // $scope.wind = [];
       // $scope.boem = [];
       // $scope.arel = [];
       // $scope.metadata = [];
       // $scope.disp = [];
       // $scope.mml = [];
       // $scope.hydrok = [];
       // $scope.test = [];

        $scope.aoismenu = [];
        $scope.aoistates = [];
//        $scope.aoistate = [];

        var query = L.esri.query({
            url: ortMapServer + ortLayerAOI

        });
        //query.returnGeometry = false;
        query.returnGeometry(false).where("KNOWN_AREA='Special Interest Areas'").run(function (error, featureCollection, response) {
            //query.where("COMMON_NM='*'").run(function (error, featureCollection, response) {
            // query.where("COMMON_NM LIKE '%'").run(function (error, featureCollection, response) {


            var ba = 0;


            for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                // switch (featureCollection.features[i].properties.REPORT_TYPE) {
                //    case  "High Priority Areas":

                $scope.aoismenu[ba] = {
                    AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                    COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                    REPORT_TYPE: featureCollection.features[i].properties.REPORT_TYPE,
                    AOI_ID: featureCollection.features[i].properties.AOI_ID,
                    DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                    DESC_: featureCollection.features[i].properties.DESC_
                };
                ba++;
                //      break;

                //}
            }
            //console.log($scope.aoismenu);
            $scope.aoismenu.sort(function (a, b) {
                //return parseFloat(a.AOI_NAME) - parseFloat(b.AOI_NAME);
                return a.AOI_NAME.localeCompare(b.AOI_NAME);
            });
        });


        //query.returnGeometry(false).where("KNOWN_AREA='Other Areas by State'").run(function (error, featureCollection, response) {
        query.returnGeometry(false).where("KNOWN_AREA='Other Areas by State'").run(function (error, featureCollection, response) {
                var ba = 0;
                for (var i = 0, j = featureCollection.features.length; i < j; i++) {
                    $scope.aoistates[ba] = {
                        AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                        REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                        AOI_ID: featureCollection.features[i].properties.AOI_ID,
                        DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                        DESC_: featureCollection.features[i].properties.DESC_
                    };
                    ba++;
                }
                //console.log($scope.aoistates);
                $scope.aoistates.sort(function (a, b) {
                    return a.AOI_NAME.localeCompare(b.AOI_NAME);
                });
                //console.log($scope.aoistates);
            }
        );


        //console.log($scope.aoismenu);

        //I think this would be the right place to put the menu data loop.

        /*        var cMapLayer3 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/34';

         var query = L.esri.query({
         url: cMapLayer3,

         });

         //console.log("2");

         query.where("AOI_NAME='Grand Strand' AND DATASET_NM='AOI_input'").run(function (error, featureCollection, response) {


         //console.log(featureCollection);
         });
         */
    }
    ])
;


angular.element(document).ready(function () {

    c = angular.element(document.querySelector('#controller-demo')).scope();
});

// Test
angular.element(document).ready(function () {
    // if (console.assert)
    //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
;
'use strict';

/* Filters */

angular.module('myApp.filters', []);
;
'use strict';

/* Directives */



angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }
    ])





    .directive('infoDirective', function () {
        return {
            restrict: 'E',
            scope: {
                modalTemplate: '@',
                modalImg: '@',
                message: '=',
                metadataUrl: '@'
            },
            template: '<a href ng-click="show(modalTemplate)" ><div ng-include="" src="modalImg"></div></a>',
            controller: function ($scope, ModalService) {

                $scope.show = function (modalTemplate) {
                    //console.log("show " +$scope.metadataUrl);
                    ModalService.showModal({
                        templateUrl: modalTemplate,
                        controller: "ModalController",
                        inputs: {
                            metaurl: $scope.metadataUrl

                        }
                    }).then(function (modal) {
                        modal.close.then(function (result) {
                            $scope.message = "You said " + result;

                        });
                    });
                };

            }
        }
    })
    .directive('renewableEnergy', function () {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'partials/RenewableEnergyLeases.html',
            controller: function ($scope, AOI) {
                $scope.AOI = AOI;
            }
        }
    });

;
'use strict';

var ortMapServer = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/';
var ortLayerAOI = '7';
var ortLayerData = '35';
var ortLayerOptional = [];

var windChart;

ortLayerOptional[0]=
{
    num:'19',
    name:'wind resource potential'
};
ortLayerOptional[1]=
{
    num:'18',
    name:'renewable energy leases'
};
ortLayerOptional[2]=
{
    num:'22',
    name:'BOEM_Wind_Planning_Areas'
};
ortLayerOptional[3]=
{
    num:'23',
    name:'Ocean Disposal Sites'
};
ortLayerOptional[4]=
{
    num:'21',
    name:'Marine Minerals Leases'
};
ortLayerOptional[5]=
{
    num:null,
    name:'Sediment Resources'
};
ortLayerOptional[6]=
{
    num:'3',
    name:'Hydrokinetic Leases'
};
ortLayerOptional[7]=
{
    num:null,
    name:'Surficial Sediment Classification'
};
ortLayerOptional[8]=
{
    num:20,
    name:'Wave Power'
};
ortLayerOptional[9]=
{
    num:32,
    name:'Tidal Power'
};
ortLayerOptional[10]=
{
    num:31,
    name:'Current Power'
};
ortLayerOptional[11]=
{
    num:6,
    name:'Beach Nourishment'
};
ortLayerOptional[12]=
{
    num:null,
    name:'Oil and Gas Planing Area'
};


var map = L.map('bigmap',{
    zoomControl: false
});




var toggle = false;
var windclass = [];
//var windrpLayer,windLeaseLayer,windPlanningLayer,oceanDisposalSites,marineMineralsLeases,HydrokineticLeases;
var toggleFull = false;
var cLayer,mouseLayer;
var menuitems= [];

function preloader() {
    if (document.images) {
        var img1 = new Image();
       // var img2 = new Image();
       // var img3 = new Image();

        img1.src = "img/wind_cc.svg";
       // img2.src = "img/GandH.png";
       // img3.src = "img/info.png";
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);

var marker;
L.esri.basemapLayer('Oceans').addTo(map);
L.esri.basemapLayer('OceansLabels').addTo(map);
L.control.zoom({
    position:'bottomleft'
}).addTo(map);
console.log("number of optional layers " +ortLayerOptional.length);
for (var i = 0; i < ortLayerOptional.length; i++) {
    map.createPane('optionalfeature'+i);
};
map.setView([33.51, -78.3], 6);
map.createPane('AOIfeature');

// Declare app level module which depends on filters, and services
angular.module('myApp', [
      'ui.router',
      'angular.filter',
      'myApp.filters',
      'myApp.services',
      'myApp.directives',
      'myApp.controllers',
      'angulartics',
      'angulartics.google.analytics',
      'pageslide-directive',
      'angularModalService',
      'ngAnimate'

    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      //$urlRouterProvider.otherwise('/help');
        $urlRouterProvider.otherwise('/main');
      $stateProvider

          .state('otherwise', {
              url : '/main',
              templateUrl:'partials/splash.html',
          })
          .state('CEview', {
              //url: '/AOI?detail',
              templateUrl: 'partials/CE.html',
              controller: 'AOICtrl'
          })
          .state('view3', {
           // url: '/view3',
            templateUrl: 'partials/NRC.html',
            //controller: 'MyCtrl3'
          })
          .state('view4',{
          //  url:'/view4',
            templateUrl:'partials/TI.html',
           // controller: 'MyCtrl4'
          })
        .state('EMview', {
          //  url: '/EM',
            templateUrl: 'partials/EnergyMineral.html',
            controller: 'MyCtrl2'
        })
          .state('view5',{
           //   url:'/view5',
              templateUrl:'partials/EC.html',
             // controller: 'MyCtrl5'
          })
          .state('meta',{
              //url:'/metadata',
              templateUrl:'partials/metadata.html',
              // controller: 'MyCtrl5'
          })
          .state('splash',{
              url:'/splash',
              templateUrl:'partials/splash.html',
             // controller: 'splashCtrl'
          })
          .state('menu',{
              url:'/menu',
              templateUrl:'partials/menu.html',
              // controller: 'splashCtrl'
          })
      ;
    }])
    .config(function($animateProvider) {
      $animateProvider.classNameFilter(/angular-animate/);
    })

    .config(function ($analyticsProvider) {
      $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
      $analyticsProvider.withAutoBase(true);  /* Records full path */
    })

;



;
/**
 * Bunch of useful filters for angularJS(with no external dependencies!)
 * @version v0.5.7 - 2015-10-04 * @link https://github.com/a8m/angular-filter
 * @author Ariel Mashraki <ariel@mashraki.co.il>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */!function(a,b,c){"use strict";function d(a){return D(a)?a:Object.keys(a).map(function(b){return a[b]})}function e(a){return null===a}function f(a,b){var d=Object.keys(a);return-1==d.map(function(d){return b[d]!==c&&b[d]==a[d]}).indexOf(!1)}function g(a,b){if(""===b)return a;var c=a.indexOf(b.charAt(0));return-1===c?!1:g(a.substr(c+1),b.substr(1))}function h(a,b,c){var d=0;return a.filter(function(a){var e=x(c)?b>d&&c(a):b>d;return d=e?d+1:d,e})}function i(a,b,c){return c.round(a*c.pow(10,b))/c.pow(10,b)}function j(a,b,c){b=b||[];var d=Object.keys(a);return d.forEach(function(d){if(C(a[d])&&!D(a[d])){var e=c?c+"."+d:c;j(a[d],b,e||d)}else{var f=c?c+"."+d:d;b.push(f)}}),b}function k(a){return a&&a.$evalAsync&&a.$watch}function l(){return function(a,b){return a>b}}function m(){return function(a,b){return a>=b}}function n(){return function(a,b){return b>a}}function o(){return function(a,b){return b>=a}}function p(){return function(a,b){return a==b}}function q(){return function(a,b){return a!=b}}function r(){return function(a,b){return a===b}}function s(){return function(a,b){return a!==b}}function t(a){return function(b,c){return b=C(b)?d(b):b,!D(b)||y(c)?!1:b.some(function(b){return C(b)||z(c)?a(c)(b):b===c})}}function u(a,b){return b=b||0,b>=a.length?a:D(a[b])?u(a.slice(0,b).concat(a[b],a.slice(b+1)),b):u(a,b+1)}function v(a){return function(b,c){function e(a,b){return y(b)?!1:a.some(function(a){return H(a,b)})}if(b=C(b)?d(b):b,!D(b))return b;var f=[],g=a(c);return y(c)?b.filter(function(a,b,c){return c.indexOf(a)===b}):b.filter(function(a){var b=g(a);return e(f,b)?!1:(f.push(b),!0)})}}function w(a,b,c){return b?a+c+w(a,--b,c):a}var x=b.isDefined,y=b.isUndefined,z=b.isFunction,A=b.isString,B=b.isNumber,C=b.isObject,D=b.isArray,E=b.forEach,F=b.extend,G=b.copy,H=b.equals;String.prototype.contains||(String.prototype.contains=function(){return-1!==String.prototype.indexOf.apply(this,arguments)}),b.module("a8m.angular",[]).filter("isUndefined",function(){return function(a){return b.isUndefined(a)}}).filter("isDefined",function(){return function(a){return b.isDefined(a)}}).filter("isFunction",function(){return function(a){return b.isFunction(a)}}).filter("isString",function(){return function(a){return b.isString(a)}}).filter("isNumber",function(){return function(a){return b.isNumber(a)}}).filter("isArray",function(){return function(a){return b.isArray(a)}}).filter("isObject",function(){return function(a){return b.isObject(a)}}).filter("isEqual",function(){return function(a,c){return b.equals(a,c)}}),b.module("a8m.conditions",[]).filter({isGreaterThan:l,">":l,isGreaterThanOrEqualTo:m,">=":m,isLessThan:n,"<":n,isLessThanOrEqualTo:o,"<=":o,isEqualTo:p,"==":p,isNotEqualTo:q,"!=":q,isIdenticalTo:r,"===":r,isNotIdenticalTo:s,"!==":s}),b.module("a8m.is-null",[]).filter("isNull",function(){return function(a){return e(a)}}),b.module("a8m.after-where",[]).filter("afterWhere",function(){return function(a,b){if(a=C(a)?d(a):a,!D(a)||y(b))return a;var c=a.map(function(a){return f(b,a)}).indexOf(!0);return a.slice(-1===c?0:c)}}),b.module("a8m.after",[]).filter("after",function(){return function(a,b){return a=C(a)?d(a):a,D(a)?a.slice(b):a}}),b.module("a8m.before-where",[]).filter("beforeWhere",function(){return function(a,b){if(a=C(a)?d(a):a,!D(a)||y(b))return a;var c=a.map(function(a){return f(b,a)}).indexOf(!0);return a.slice(0,-1===c?a.length:++c)}}),b.module("a8m.before",[]).filter("before",function(){return function(a,b){return a=C(a)?d(a):a,D(a)?a.slice(0,b?--b:b):a}}),b.module("a8m.chunk-by",["a8m.filter-watcher"]).filter("chunkBy",["filterWatcher",function(a){return function(b,c,d){function e(a,b){for(var c=[];a--;)c[a]=b;return c}function f(a,b,c){return D(a)?a.map(function(a,d,f){return d*=b,a=f.slice(d,d+b),!y(c)&&a.length<b?a.concat(e(b-a.length,c)):a}).slice(0,Math.ceil(a.length/b)):a}return a.isMemoized("chunkBy",arguments)||a.memoize("chunkBy",arguments,this,f(b,c,d))}}]),b.module("a8m.concat",[]).filter("concat",[function(){return function(a,b){if(y(b))return a;if(D(a))return C(b)?a.concat(d(b)):a.concat(b);if(C(a)){var c=d(a);return C(b)?c.concat(d(b)):c.concat(b)}return a}}]),b.module("a8m.contains",[]).filter({contains:["$parse",t],some:["$parse",t]}),b.module("a8m.count-by",[]).filter("countBy",["$parse",function(a){return function(b,c){var e,f={},g=a(c);return b=C(b)?d(b):b,!D(b)||y(c)?b:(b.forEach(function(a){e=g(a),f[e]||(f[e]=0),f[e]++}),f)}}]),b.module("a8m.defaults",[]).filter("defaults",["$parse",function(a){return function(b,c){if(b=C(b)?d(b):b,!D(b)||!C(c))return b;var e=j(c);return b.forEach(function(b){e.forEach(function(d){var e=a(d),f=e.assign;y(e(b))&&f(b,e(c))})}),b}}]),b.module("a8m.every",[]).filter("every",["$parse",function(a){return function(b,c){return b=C(b)?d(b):b,!D(b)||y(c)?!0:b.every(function(b){return C(b)||z(c)?a(c)(b):b===c})}}]),b.module("a8m.filter-by",[]).filter("filterBy",["$parse",function(a){return function(b,e,f){var g;return f=A(f)||B(f)?String(f).toLowerCase():c,b=C(b)?d(b):b,!D(b)||y(f)?b:b.filter(function(b){return e.some(function(c){if(~c.indexOf("+")){var d=c.replace(new RegExp("\\s","g"),"").split("+");g=d.reduce(function(c,d,e){return 1===e?a(c)(b)+" "+a(d)(b):c+" "+a(d)(b)})}else g=a(c)(b);return A(g)||B(g)?String(g).toLowerCase().contains(f):!1})})}}]),b.module("a8m.first",[]).filter("first",["$parse",function(a){return function(b){var e,f,g;return b=C(b)?d(b):b,D(b)?(g=Array.prototype.slice.call(arguments,1),e=B(g[0])?g[0]:1,f=B(g[0])?B(g[1])?c:g[1]:g[0],g.length?h(b,e,f?a(f):f):b[0]):b}}]),b.module("a8m.flatten",[]).filter("flatten",function(){return function(a,b){return b=b||!1,a=C(a)?d(a):a,D(a)?b?[].concat.apply([],a):u(a,0):a}}),b.module("a8m.fuzzy-by",[]).filter("fuzzyBy",["$parse",function(a){return function(b,c,e,f){var h,i,j=f||!1;return b=C(b)?d(b):b,!D(b)||y(c)||y(e)?b:(i=a(c),b.filter(function(a){return h=i(a),A(h)?(h=j?h:h.toLowerCase(),e=j?e:e.toLowerCase(),g(h,e)!==!1):!1}))}}]),b.module("a8m.fuzzy",[]).filter("fuzzy",function(){return function(a,b,c){function e(a,b){var c,d,e=Object.keys(a);return 0<e.filter(function(e){return c=a[e],d?!0:A(c)?(c=f?c:c.toLowerCase(),d=g(c,b)!==!1):!1}).length}var f=c||!1;return a=C(a)?d(a):a,!D(a)||y(b)?a:(b=f?b:b.toLowerCase(),a.filter(function(a){return A(a)?(a=f?a:a.toLowerCase(),g(a,b)!==!1):C(a)?e(a,b):!1}))}}),b.module("a8m.group-by",["a8m.filter-watcher"]).filter("groupBy",["$parse","filterWatcher",function(a,b){return function(c,d){function e(a,b){var c,d={};return E(a,function(a){c=b(a),d[c]||(d[c]=[]),d[c].push(a)}),d}return!C(c)||y(d)?c:b.isMemoized("groupBy",arguments)||b.memoize("groupBy",arguments,this,e(c,a(d)))}}]),b.module("a8m.is-empty",[]).filter("isEmpty",function(){return function(a){return C(a)?!d(a).length:!a.length}}),b.module("a8m.join",[]).filter("join",function(){return function(a,b){return y(a)||!D(a)?a:(y(b)&&(b=" "),a.join(b))}}),b.module("a8m.last",[]).filter("last",["$parse",function(a){return function(b){var e,f,g,i=G(b);return i=C(i)?d(i):i,D(i)?(g=Array.prototype.slice.call(arguments,1),e=B(g[0])?g[0]:1,f=B(g[0])?B(g[1])?c:g[1]:g[0],g.length?h(i.reverse(),e,f?a(f):f).reverse():i[i.length-1]):i}}]),b.module("a8m.map",[]).filter("map",["$parse",function(a){return function(b,c){return b=C(b)?d(b):b,!D(b)||y(c)?b:b.map(function(b){return a(c)(b)})}}]),b.module("a8m.omit",[]).filter("omit",["$parse",function(a){return function(b,c){return b=C(b)?d(b):b,!D(b)||y(c)?b:b.filter(function(b){return!a(c)(b)})}}]),b.module("a8m.pick",[]).filter("pick",["$parse",function(a){return function(b,c){return b=C(b)?d(b):b,!D(b)||y(c)?b:b.filter(function(b){return a(c)(b)})}}]),b.module("a8m.range",[]).filter("range",function(){return function(a,b){for(var c=0;c<parseInt(b);c++)a.push(c);return a}}),b.module("a8m.remove-with",[]).filter("removeWith",function(){return function(a,b){return y(b)?a:(a=C(a)?d(a):a,a.filter(function(a){return!f(b,a)}))}}),b.module("a8m.remove",[]).filter("remove",function(){return function(a){a=C(a)?d(a):a;var b=Array.prototype.slice.call(arguments,1);return D(a)?a.filter(function(a){return!b.some(function(b){return H(b,a)})}):a}}),b.module("a8m.reverse",[]).filter("reverse",[function(){return function(a){return a=C(a)?d(a):a,A(a)?a.split("").reverse().join(""):D(a)?a.slice().reverse():a}}]),b.module("a8m.search-field",[]).filter("searchField",["$parse",function(a){return function(b){var c,e;b=C(b)?d(b):b;var f=Array.prototype.slice.call(arguments,1);return D(b)&&f.length?b.map(function(b){return e=f.map(function(d){return(c=a(d))(b)}).join(" "),F(b,{searchField:e})}):b}}]),b.module("a8m.to-array",[]).filter("toArray",function(){return function(a,b){return C(a)?b?Object.keys(a).map(function(b){return F(a[b],{$key:b})}):d(a):a}}),b.module("a8m.unique",[]).filter({unique:["$parse",v],uniq:["$parse",v]}),b.module("a8m.where",[]).filter("where",function(){return function(a,b){return y(b)?a:(a=C(a)?d(a):a,a.filter(function(a){return f(b,a)}))}}),b.module("a8m.xor",[]).filter("xor",["$parse",function(a){return function(b,c,e){function f(b,c){var d=a(e);return c.some(function(a){return e?H(d(a),d(b)):H(a,b)})}return e=e||!1,b=C(b)?d(b):b,c=C(c)?d(c):c,D(b)&&D(c)?b.concat(c).filter(function(a){return!(f(a,b)&&f(a,c))}):b}}]),b.module("a8m.math.byteFmt",["a8m.math"]).filter("byteFmt",["$math",function(a){return function(b,c){return B(c)&&isFinite(c)&&c%1===0&&c>=0&&B(b)&&isFinite(b)?1024>b?i(b,c,a)+" B":1048576>b?i(b/1024,c,a)+" KB":1073741824>b?i(b/1048576,c,a)+" MB":i(b/1073741824,c,a)+" GB":"NaN"}}]),b.module("a8m.math.degrees",["a8m.math"]).filter("degrees",["$math",function(a){return function(b,c){if(B(c)&&isFinite(c)&&c%1===0&&c>=0&&B(b)&&isFinite(b)){var d=180*b/a.PI;return a.round(d*a.pow(10,c))/a.pow(10,c)}return"NaN"}}]),b.module("a8m.math.kbFmt",["a8m.math"]).filter("kbFmt",["$math",function(a){return function(b,c){return B(c)&&isFinite(c)&&c%1===0&&c>=0&&B(b)&&isFinite(b)?1024>b?i(b,c,a)+" KB":1048576>b?i(b/1024,c,a)+" MB":i(b/1048576,c,a)+" GB":"NaN"}}]),b.module("a8m.math",[]).factory("$math",["$window",function(a){return a.Math}]),b.module("a8m.math.max",["a8m.math"]).filter("max",["$math","$parse",function(a,b){function c(c,d){var e=c.map(function(a){return b(d)(a)});return e.indexOf(a.max.apply(a,e))}return function(b,d){return D(b)?y(d)?a.max.apply(a,b):b[c(b,d)]:b}}]),b.module("a8m.math.min",["a8m.math"]).filter("min",["$math","$parse",function(a,b){function c(c,d){var e=c.map(function(a){return b(d)(a)});return e.indexOf(a.min.apply(a,e))}return function(b,d){return D(b)?y(d)?a.min.apply(a,b):b[c(b,d)]:b}}]),b.module("a8m.math.percent",["a8m.math"]).filter("percent",["$math","$window",function(a,b){return function(c,d,e){var f=A(c)?b.Number(c):c;return d=d||100,e=e||!1,!B(f)||b.isNaN(f)?c:e?a.round(f/d*100):f/d*100}}]),b.module("a8m.math.radians",["a8m.math"]).filter("radians",["$math",function(a){return function(b,c){if(B(c)&&isFinite(c)&&c%1===0&&c>=0&&B(b)&&isFinite(b)){var d=3.14159265359*b/180;return a.round(d*a.pow(10,c))/a.pow(10,c)}return"NaN"}}]),b.module("a8m.math.radix",[]).filter("radix",function(){return function(a,b){var c=/^[2-9]$|^[1-2]\d$|^3[0-6]$/;return B(a)&&c.test(b)?a.toString(b).toUpperCase():a}}),b.module("a8m.math.shortFmt",["a8m.math"]).filter("shortFmt",["$math",function(a){return function(b,c){return B(c)&&isFinite(c)&&c%1===0&&c>=0&&B(b)&&isFinite(b)?1e3>b?b:1e6>b?i(b/1e3,c,a)+" K":1e9>b?i(b/1e6,c,a)+" M":i(b/1e9,c,a)+" B":"NaN"}}]),b.module("a8m.math.sum",[]).filter("sum",function(){return function(a,b){return D(a)?a.reduce(function(a,b){return a+b},b||0):a}}),b.module("a8m.ends-with",[]).filter("endsWith",function(){return function(a,b,c){var d,e=c||!1;return!A(a)||y(b)?a:(a=e?a:a.toLowerCase(),d=a.length-b.length,-1!==a.indexOf(e?b:b.toLowerCase(),d))}}),b.module("a8m.latinize",[]).filter("latinize",[function(){function a(a){return a.replace(/[^\u0000-\u007E]/g,function(a){return c[a]||a})}for(var b=[{base:"A",letters:"AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",letters:"Ꜳ"},{base:"AE",letters:"ÆǼǢ"},{base:"AO",letters:"Ꜵ"},{base:"AU",letters:"Ꜷ"},{base:"AV",letters:"ꜸꜺ"},{base:"AY",letters:"Ꜽ"},{base:"B",letters:"BⒷＢḂḄḆɃƂƁ"},{base:"C",letters:"CⒸＣĆĈĊČÇḈƇȻꜾ"},{base:"D",letters:"DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"},{base:"DZ",letters:"ǱǄ"},{base:"Dz",letters:"ǲǅ"},{base:"E",letters:"EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"},{base:"F",letters:"FⒻＦḞƑꝻ"},{base:"G",letters:"GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"},{base:"H",letters:"HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",letters:"IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",letters:"JⒿＪĴɈ"},{base:"K",letters:"KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",letters:"LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",letters:"Ǉ"},{base:"Lj",letters:"ǈ"},{base:"M",letters:"MⓂＭḾṀṂⱮƜ"},{base:"N",letters:"NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"},{base:"NJ",letters:"Ǌ"},{base:"Nj",letters:"ǋ"},{base:"O",letters:"OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OI",letters:"Ƣ"},{base:"OO",letters:"Ꝏ"},{base:"OU",letters:"Ȣ"},{base:"OE",letters:"Œ"},{base:"oe",letters:"œ"},{base:"P",letters:"PⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",letters:"QⓆＱꝖꝘɊ"},{base:"R",letters:"RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",letters:"SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",letters:"TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"TZ",letters:"Ꜩ"},{base:"U",letters:"UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",letters:"VⓋＶṼṾƲꝞɅ"},{base:"VY",letters:"Ꝡ"},{base:"W",letters:"WⓌＷẀẂŴẆẄẈⱲ"},{base:"X",letters:"XⓍＸẊẌ"},{base:"Y",letters:"YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",letters:"ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",letters:"aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"},{base:"aa",letters:"ꜳ"},{base:"ae",letters:"æǽǣ"},{base:"ao",letters:"ꜵ"},{base:"au",letters:"ꜷ"},{base:"av",letters:"ꜹꜻ"},{base:"ay",letters:"ꜽ"},{base:"b",letters:"bⓑｂḃḅḇƀƃɓ"},{base:"c",letters:"cⓒｃćĉċčçḉƈȼꜿↄ"},{base:"d",letters:"dⓓｄḋďḍḑḓḏđƌɖɗꝺ"},{base:"dz",letters:"ǳǆ"},{base:"e",letters:"eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"},{base:"f",letters:"fⓕｆḟƒꝼ"},{base:"g",letters:"gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"},{base:"h",letters:"hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",letters:"ƕ"},{base:"i",letters:"iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",letters:"jⓙｊĵǰɉ"},{base:"k",letters:"kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",letters:"lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"},{base:"lj",letters:"ǉ"},{base:"m",letters:"mⓜｍḿṁṃɱɯ"},{base:"n",letters:"nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"},{base:"nj",letters:"ǌ"},{base:"o",letters:"oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"},{base:"oi",letters:"ƣ"},{base:"ou",letters:"ȣ"},{base:"oo",letters:"ꝏ"},{base:"p",letters:"pⓟｐṕṗƥᵽꝑꝓꝕ"},{base:"q",letters:"qⓠｑɋꝗꝙ"},{base:"r",letters:"rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",letters:"sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"},{base:"t",letters:"tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"tz",letters:"ꜩ"},{base:"u",letters:"uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",letters:"vⓥｖṽṿʋꝟʌ"},{base:"vy",letters:"ꝡ"},{base:"w",letters:"wⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",letters:"xⓧｘẋẍ"},{base:"y",letters:"yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",letters:"zⓩｚźẑżžẓẕƶȥɀⱬꝣ"}],c={},d=0;d<b.length;d++)for(var e=b[d].letters.split(""),f=0;f<e.length;f++)c[e[f]]=b[d].base;return function(b){return A(b)?a(b):b}}]),b.module("a8m.ltrim",[]).filter("ltrim",function(){return function(a,b){var c=b||"\\s";return A(a)?a.replace(new RegExp("^"+c+"+"),""):a}}),b.module("a8m.match",[]).filter("match",function(){return function(a,b,c){var d=new RegExp(b,c);return A(a)?a.match(d):null}}),b.module("a8m.repeat",[]).filter("repeat",[function(){return function(a,b,c){var d=~~b;return A(a)&&d?w(a,--b,c||""):a}}]),b.module("a8m.rtrim",[]).filter("rtrim",function(){return function(a,b){var c=b||"\\s";return A(a)?a.replace(new RegExp(c+"+$"),""):a}}),b.module("a8m.slugify",[]).filter("slugify",[function(){return function(a,b){var c=y(b)?"-":b;return A(a)?a.toLowerCase().replace(/\s+/g,c):a}}]),b.module("a8m.starts-with",[]).filter("startsWith",function(){return function(a,b,c){var d=c||!1;return!A(a)||y(b)?a:(a=d?a:a.toLowerCase(),!a.indexOf(d?b:b.toLowerCase()))}}),b.module("a8m.stringular",[]).filter("stringular",function(){return function(a){var b=Array.prototype.slice.call(arguments,1);return a.replace(/{(\d+)}/g,function(a,c){return y(b[c])?a:b[c]})}}),b.module("a8m.strip-tags",[]).filter("stripTags",function(){return function(a){return A(a)?a.replace(/<\S[^><]*>/g,""):a}}),b.module("a8m.test",[]).filter("test",function(){return function(a,b,c){var d=new RegExp(b,c);return A(a)?d.test(a):a}}),b.module("a8m.trim",[]).filter("trim",function(){return function(a,b){var c=b||"\\s";return A(a)?a.replace(new RegExp("^"+c+"+|"+c+"+$","g"),""):a}}),b.module("a8m.truncate",[]).filter("truncate",function(){return function(a,b,c,d){return b=y(b)?a.length:b,d=d||!1,c=c||"",!A(a)||a.length<=b?a:a.substring(0,d?-1===a.indexOf(" ",b)?a.length:a.indexOf(" ",b):b)+c}}),b.module("a8m.ucfirst",[]).filter("ucfirst",[function(){return function(a){return A(a)?a.split(" ").map(function(a){return a.charAt(0).toUpperCase()+a.substring(1)}).join(" "):a}}]),b.module("a8m.uri-component-encode",[]).filter("uriComponentEncode",["$window",function(a){return function(b){return A(b)?a.encodeURIComponent(b):b}}]),b.module("a8m.uri-encode",[]).filter("uriEncode",["$window",function(a){return function(b){return A(b)?a.encodeURI(b):b}}]),b.module("a8m.wrap",[]).filter("wrap",function(){return function(a,b,c){return A(a)&&x(b)?[b,a,c||b].join(""):a}}),b.module("a8m.filter-watcher",[]).provider("filterWatcher",function(){this.$get=["$window","$rootScope",function(a,b){function c(b,c){function d(){var b=[];return function(c,d){if(C(d)&&!e(d)){if(~b.indexOf(d))return"[Circular]";b.push(d)}return a==d?"$WINDOW":a.document==d?"$DOCUMENT":k(d)?"$SCOPE":d}}return[b,JSON.stringify(c,d())].join("#").replace(/"/g,"")}function d(a){var b=a.targetScope.$id;E(l[b],function(a){delete j[a]}),delete l[b]}function f(){m(function(){b.$$phase||(j={})},2e3)}function g(a,b){var c=a.$id;return y(l[c])&&(a.$on("$destroy",d),l[c]=[]),l[c].push(b)}function h(a,b){var d=c(a,b);return j[d]}function i(a,b,d,e){var h=c(a,b);return j[h]=e,k(d)?g(d,h):f(),e}var j={},l={},m=a.setTimeout;return{isMemoized:h,memoize:i}}]}),b.module("angular.filter",["a8m.ucfirst","a8m.uri-encode","a8m.uri-component-encode","a8m.slugify","a8m.latinize","a8m.strip-tags","a8m.stringular","a8m.truncate","a8m.starts-with","a8m.ends-with","a8m.wrap","a8m.trim","a8m.ltrim","a8m.rtrim","a8m.repeat","a8m.test","a8m.match","a8m.to-array","a8m.concat","a8m.contains","a8m.unique","a8m.is-empty","a8m.after","a8m.after-where","a8m.before","a8m.before-where","a8m.defaults","a8m.where","a8m.reverse","a8m.remove","a8m.remove-with","a8m.group-by","a8m.count-by","a8m.chunk-by","a8m.search-field","a8m.fuzzy-by","a8m.fuzzy","a8m.omit","a8m.pick","a8m.every","a8m.filter-by","a8m.xor","a8m.map","a8m.first","a8m.last","a8m.flatten","a8m.join","a8m.range","a8m.math","a8m.math.max","a8m.math.min","a8m.math.percent","a8m.math.radix","a8m.math.sum","a8m.math.degrees","a8m.math.radians","a8m.math.byteFmt","a8m.math.kbFmt","a8m.math.shortFmt","a8m.angular","a8m.conditions","a8m.is-null","a8m.filter-watcher"])}(window,window.angular);