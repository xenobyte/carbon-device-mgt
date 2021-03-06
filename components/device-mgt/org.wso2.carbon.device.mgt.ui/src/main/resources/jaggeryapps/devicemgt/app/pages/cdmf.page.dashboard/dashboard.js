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
    var constants = require("/app/modules/constants.js");
    var user = session.get(constants.USER_SESSION_KEY);
    var userModule = require("/app/modules/user.js").userModule;
    var permissions = userModule.getUIPermissions();
    var devicemgtProps = require('/app/conf/devicemgt-props.js').config();

    if (!permissions.VIEW_DASHBOARD) {
        response.sendRedirect(constants.WEB_APP_CONTEXT + "/devices");
        return;
    }

    var page = {};
    page.permissions = permissions;
    page.enrollmentURL = devicemgtProps.enrollmentURL;
    var deviceModule = require("/app/modules/device.js").deviceModule;
    var groupModule = require("/app/modules/group.js").groupModule;
    var policyModule = require("/app/modules/policy.js").policyModule;

    page.device_count = deviceModule.getDevicesCount();
    page.group_count = groupModule.getGroupCount();
    page.user_count = userModule.getUsers()["content"].length;
    page.policy_count = policyModule.getAllPolicies()["content"].length;
    page.role_count = userModule.getRoles()["content"].length;

    return page;
}
