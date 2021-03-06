/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2014-2015 Oracle and/or its affiliates. All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common Development
 * and Distribution License("CDDL") (collectively, the "License").  You
 * may not use this file except in compliance with the License.  You can
 * obtain a copy of the License at
 * http://glassfish.java.net/public/CDDL+GPL_1_1.html
 * or packager/legal/LICENSE.txt.  See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the License file at packager/legal/LICENSE.txt.
 *
 * GPL Classpath Exception:
 * Oracle designates this particular file as subject to the "Classpath"
 * exception as provided by Oracle in the GPL Version 2 section of the License
 * file that accompanied this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 * Contributor(s):
 * If you wish your version of this file to be governed by only the CDDL or
 * only the GPL Version 2, indicate your decision by adding "[Contributor]
 * elects to include this software in this distribution under the [CDDL or GPL
 * Version 2] license."  If you don't indicate a single choice of license, a
 * recipient has the option to distribute your version of this file under
 * either the CDDL, the GPL Version 2 or to extend the choice of license to
 * its licensees as provided above.  However, if you add GPL Version 2 code
 * and therefore, elected the GPL Version 2 license, then the option applies
 * only if the new code is made subject to such option by the copyright
 * holder.
 */

/**
 * Get root Uri.
 *
 * @param {string} protocol
 * @returns {string}
 */
window.getRootUri = function (protocol) {
    if (!protocol || protocol === null || typeof protocol !== "string") {
        throw new Error("Parameter 'postUrl' must be present and must be a string.")
    }

    return protocol + "://" + (document.location.hostname == "" ? "localhost" : document.location.hostname) +
        ":" + (document.location.port == "" ? "8085" : document.location.port);
};

window.boardUpdate = function () {
    var content = "";

    content += "<div class='item'><span class='key title'>" + "Key" +
        "</span><span class='value title'>" + "Value" +
        "</span><span class='remove'></span></div>";

    for (var key in window.collection.keySet()) {
        //noinspection JSUnfilteredForInLoop
        var val = window.collection.get(key);
        content += "<div class='item' onclick='document.getElementById(\"key\").value = \"" + key + "\"; document.getElementById(\"value\").value = \"" + val + "\"'>" +
            "<span class='key'>" + key +
            "</span><span class='value'>" + val +
            "</span><span class='remove' onclick='window.collection.remove(\"" + key + "\")'>&#10008;</span></div>";
    }

    document.getElementById("board").innerHTML = content;
};

window.change = function () {
    var key = document.getElementById("key").value;
    if (key && key !== null && key !== "") {
        window.collection.put(key, document.getElementById("value").value);
    }
};

window.wsUri = window.getRootUri("ws") + "/sample-shared-collection/ws/collection";
window.restUri = window.getRootUri("http") + "/sample-shared-collection/rest/collection";

window.test = function () {
    console.time("test");
    var exceptions = 0;
    for (i = 0; i < 10000; i++) {
        try {
            window.collection.put("test", i.toString());
        } catch (excetion) {
            exceptions++;
            // console.log(excetion);
        }
    }
    console.timeEnd("test");
    console.log("exceptions: " + exceptions)
};
