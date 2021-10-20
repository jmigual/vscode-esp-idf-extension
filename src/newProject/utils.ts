/*
 * Project: ESP-IDF VSCode Extension
 * File Created: Tuesday, 27th July 2021 4:35:42 pm
 * Copyright 2021 Espressif Systems (Shanghai) CO LTD
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { readParameter } from "../idfConfiguration";
import { readJSON } from "fs-extra";

export async function setCurrentSettingsInTemplate(
  settingsJsonPath: string,
  idfTarget: string,
  openOcdConfigs: string,
  port: string
) {
  const settingsJson = await readJSON(settingsJsonPath);
  const idfPathDir = readParameter("idf.espIdfPath");
  const adfPathDir = readParameter("idf.espAdfPath");
  const mdfPathDir = readParameter("idf.espMdfPath");
  const extraPaths = readParameter("idf.customExtraPaths");
  const extraVars = readParameter("idf.customExtraVars") as string;
  const toolsDir = readParameter("idf.toolsPath");
  const pyPath = readParameter("idf.pythonBinPath");
  const isWin = process.platform === "win32" ? "Win" : "";
  settingsJson["idf.adapterTargetName"] = idfTarget || "esp32";
  if (extraPaths) {
    settingsJson["idf.customExtraPaths"] = extraPaths;
  }
  if (extraVars) {
    settingsJson["idf.customExtraVars"] = extraVars;
  }
  if (idfPathDir) {
    settingsJson["idf.espIdfPath" + isWin] = idfPathDir;
  }
  if (adfPathDir) {
    settingsJson["idf.espAdfPath" + isWin] = adfPathDir;
  }
  if (mdfPathDir) {
    settingsJson["idf.espMdfPath" + isWin] = mdfPathDir;
  }
  settingsJson["idf.openOcdConfigs"] = openOcdConfigs;
  if (port.indexOf("no port") === -1) {
    settingsJson["idf.port" + isWin] = port;
  }
  if (pyPath) {
    settingsJson["idf.pythonBinPath" + isWin] = pyPath;
  }
  if (toolsDir) {
    settingsJson["idf.toolsPath" + isWin] = toolsDir;
  }
  return settingsJson;
}