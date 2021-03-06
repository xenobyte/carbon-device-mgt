/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function onRequest(context) {
    context.handlebars.registerHelper('unequal', function (lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue == rvalue) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });
    var page = {};
    var userModule = require("/app/modules/user.js")["userModule"];
    var deviceMgtProps = require("/app/conf/devicemgt-props.js").config();
    page["permissions"] = userModule.getUIPermissions();
    if (userModule.isAuthorized("/permission/admin/device-mgt/users/delete")) {
        page["removePermitted"] = true;
    }

    if (userModule.isAuthorized("/permission/admin/device-mgt/users/remove")) {
        page["removePermitted"] = true;
    }

    if (userModule.isAuthorized("/permission/admin/device-mgt/users/update")) {
        page["editPermitted"] = true;
    }
    if (userModule.isAuthorized("/permission/admin/device-mgt/users/view")) {
        page["viewPermitted"] = true;
    }
    if (userModule.isAuthorized("/permission/admin/device-mgt/users/invite")) {
        page["invitePermitted"] = true;
    }
    if (userModule.isAuthorized("/permission/admin/device-mgt/users/reset-password")) {
        page["resetPasswordPermitted"] = true;
    }

    page["adminUser"] = deviceMgtProps.adminUser;
    return page;
}