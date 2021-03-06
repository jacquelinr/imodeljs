/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { SnapMode } from "@bentley/imodeljs-frontend";
import { ActionsUnion, createAction } from "../redux/redux-ts";
import { COLOR_THEME_DEFAULT, WIDGET_OPACITY_DEFAULT } from "../theme/ThemeManager";

// cSpell:ignore configurableui snapmode toolprompt

/** Action Ids used by Redux and to send sync UI components. Typically used to refresh visibility or enable state of control.
 *  Since these are also used as sync ids they should be in lowercase.
 * @public
 */
export enum ConfigurableUiActionId {
  SetSnapMode = "configurableui:set_snapmode",
  SetTheme = "configurableui:set_theme",
  SetToolPrompt = "configurableui:set_toolprompt",
  SetWidgetOpacity = "configurableui:set_widget_opacity",
}

/** The portion of state managed by the ConfigurableUiReducer.
 * @public
 */
export interface ConfigurableUiState {
  snapMode: number;
  toolPrompt: string;
  theme: string;
  widgetOpacity: number;
}

/** used on first call of ConfigurableUiReducer */
const initialState: ConfigurableUiState = {
  snapMode: SnapMode.NearestKeypoint as number,
  toolPrompt: "",
  theme: COLOR_THEME_DEFAULT,
  widgetOpacity: WIDGET_OPACITY_DEFAULT,
};

/** An object with a function that creates each ConfigurableUiReducer that can be handled by our reducer.
 * @public
 */
export const ConfigurableUiActions = {   // tslint:disable-line:variable-name
  setSnapMode: (snapMode: number) => createAction(ConfigurableUiActionId.SetSnapMode, snapMode),
  setTheme: (theme: string) => createAction(ConfigurableUiActionId.SetTheme, theme),
  setToolPrompt: (toolPrompt: string) => createAction(ConfigurableUiActionId.SetToolPrompt, toolPrompt),
  setWidgetOpacity: (opacity: number) => createAction(ConfigurableUiActionId.SetWidgetOpacity, opacity),
};

/** Union of ConfigurableUi Redux actions
 * @public
 */
export type ConfigurableUiActionsUnion = ActionsUnion<typeof ConfigurableUiActions>;

/** Handles actions to update ConfigurableUiState.
 * @public
 */
export function ConfigurableUiReducer(state: ConfigurableUiState = initialState, _action: ConfigurableUiActionsUnion): ConfigurableUiState {
  let outState = state;

  switch (_action.type) {
    case ConfigurableUiActionId.SetSnapMode: {
      // istanbul ignore else
      if (undefined !== _action.payload)
        outState = { ...state, snapMode: _action.payload };
      break;
    }
    case ConfigurableUiActionId.SetToolPrompt: {
      // istanbul ignore else
      if (undefined !== _action.payload)
        outState = { ...state, toolPrompt: _action.payload };
      break;
    }
    case ConfigurableUiActionId.SetTheme: {
      // istanbul ignore else
      if (undefined !== _action.payload)
        outState = { ...state, theme: _action.payload };
      break;
    }
    case ConfigurableUiActionId.SetWidgetOpacity: {
      // istanbul ignore else
      if (undefined !== _action.payload)
        outState = { ...state, widgetOpacity: _action.payload };
      break;
    }
  }

  return outState;
}
