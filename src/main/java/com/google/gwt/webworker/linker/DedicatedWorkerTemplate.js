/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

$stats = function() {
};
$self = self;
$wnd = self;
$doc = self;
$sessionId = null;

function __MODULE_FUNC__() {
  // TODO(zundel): Add slot for property providers.
  var strongName;
  var softPermutationId = 0;
  try {
    // __PERMUTATIONS_BEGIN__
    // Permutation logic
    // __PERMUTATIONS_END__
    var idx = strongName.indexOf(':');
    if (idx != -1) {
      softPermutationId = parseInt(strongName.substring(idx + 1), 10);
      strongName = strongName.substring(0, idx);
    }
  } catch (e) {
    var errorMsg = {
      "worker bootstrap error" : e.message
    };
    self.postMessage(JSON.stringify(errorMsg));
    return;
  }
  importScripts(strongName + ".cache.js");
  gwtOnLoad(undefined, '__MODULE_NAME__', '', softPermutationId);
}

__MODULE_FUNC__();
