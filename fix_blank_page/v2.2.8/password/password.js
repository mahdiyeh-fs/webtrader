define(["exports","../websockets/binary_websockets","../windows/windows","../common/rivetsExtra","lodash","text!./password.html","css!./password.css"],function(e,s,n,a,o,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var i=u(s),d=u(n),r=u(a),l=u(o),c=u(t);function u(e){return e&&e.__esModule?e:{default:e}}var w=null,f=null,p=e.init=function(e){e.click(function(){w?w.moveToTop():m()})},m=function(){var e=$(c.default).i18n();w=d.default.createBlankWindow(e,{title:"Change password".i18n(),resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,height:350,"data-authorized":!0,close:function(){w.dialog("destroy"),w.remove(),w=null},open:function(){},destroy:function(){f&&f.unbind(),f=null}}),g(e),w.dialog("open")},g=function(e){var s={empty_fields:{validate:!1,clear:l.default.debounce(function(){s.empty_fields.validate=!1},2e3),show:function(){s.empty_fields.validate=!0,s.empty_fields.clear()}},account:{password:"",new_password:"",verify_password:""},btn:{disabled:!1},password_error_message:function(){var e=s.account.new_password;return""===e?s.empty_fields.validate?"* Please enter your new password".i18n():"":e.length<6?"* Password must be 6 characters minimum".i18n():/\d/.test(e)&&/[a-z]/.test(e)&&/[A-Z]/.test(e)?"":"* Password must contain uppercase letters and numbers".i18n()}};s.btn.change=function(){s.empty_fields.show();s.account;if(""!==s.account.password&&""===s.password_error_message()&&s.account.new_password===s.account.verify_password){var e={change_password:1,old_password:s.account.password,new_password:s.account.new_password};s.btn.disabled=!0,i.default.send(e).then(function(e){if(1!==e.change_password)throw{message:"Failed to update the password".i18n()};s.btn.disabled=!1,$.growl.notice({message:"Password successfully updated.".i18n()}),$.growl.notice({message:"Redirecting to oauth login page,<br/>Please use your new password to login.".i18n()}),require(["oauth/login"],function(e){l.default.defer(function(){return e.login()},1e3)}),w.dialog("close")}).catch(function(e){s.btn.disabled=!1,$.growl.error({message:e.message})})}},f=r.default.bind(e[0],s)};e.default={init:p}});