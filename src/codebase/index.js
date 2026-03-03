import {
  validateFields,
  validateTableSetting,
  validateRestApiSetting,
} from "./fields";
import { mainPluginCode } from "./main-plugin";
import { assetsCode } from "./assets";
import { composerCode } from "./composer";
import { installerCode } from "./installer";
import { wpCrudFunctions } from "./curd-php-snippet";
import { dynamicMenuPageHandler } from "./dynamic-menu-page-handler";
import { adminCode } from "./admin-snippet";
import { listTableCode } from "./list-table";
import { viewSnippet } from "./views/index";
import { restapiSnippet } from "./restapi-snippet";
import { apiSnippetCode } from "./api-snippet";
import { shortcodeSnippet } from "./shortcode-snippet";
import { frontendSnippet } from "./frontend-snippet";
import { menuSnippet } from "./menu-snippet";
import { formErrorSnippet } from "./form-error";
import { gitIgnoreCode } from "./gitignore-snippet";
import { editorconfigCode } from "./editorconfig-snippet";
import { phpcsCode } from "./phpcs-snippet";
import { eslintignoreCode } from "./eslintignore-snippet";
import { eslintrcCode } from "./eslintrc-snippet";
import { prettierrcCode } from "./prettierrc-snippet";
import { readmeCode } from "./readme-snippet";
import { postTypeSnippet } from "./post-type-snippet";
import { taxonomySnippet } from "./taxonomy-snippet";

export const CodeBase = {
  mainPluginCode: (data) => mainPluginCode(validateFields(data)),
  assetsCode: (data, assets) => assetsCode(validateFields(data), assets),
  composerCode: (data) => composerCode(validateFields(data)),
  installerCode: (data, tables) => installerCode(validateFields(data), tables),
  functionsCode: (data, tables) => wpCrudFunctions(validateFields(data), tables),
  dynamicMenuPageHandler: (data, table) => dynamicMenuPageHandler(validateFields(data), table),
  adminCode: (data, tables) => adminCode(validateFields(data), tables),
  listTableCode: (fileClassName, data, table) => listTableCode(fileClassName, validateFields(data), table),
  adminViewCode: (viewType, data, table) => viewSnippet(viewType, validateFields(data), table),
  restapiCode: (data, restApiData, settings, singleRestApi = false) => {
    settings = singleRestApi ? settings : validateTableSetting(settings);
    return restapiSnippet(validateFields(data), validateRestApiSetting(restApiData), settings, singleRestApi);
  },
  apiCode: (data, restapis) => apiSnippetCode(validateFields(data), restapis),
  frontendShortcode: (data) => shortcodeSnippet(validateFields(data)),
  frontendCode: (data) => frontendSnippet(validateFields(data)),
  menuCode: (data, tables, mainMenu) => menuSnippet(validateFields(data), tables, mainMenu),
  formErrorCode: (data) => formErrorSnippet(validateFields(data)),
  gitIgnoreCode: () => gitIgnoreCode(),
  editorconfigCode: () => editorconfigCode(),
  phpcsCode: () => phpcsCode(),
  eslintignoreCode: () => eslintignoreCode(),
  eslintrcCode: () => eslintrcCode(),
  prettierrcCode: () => prettierrcCode(),
  readmeCode: (data) => readmeCode(validateFields(data)),
  postTypeRegistration: (data, postTypes) => postTypeSnippet(validateFields(data), postTypes),
  taxonomyRegistration: (data, taxonomies) => taxonomySnippet(validateFields(data), taxonomies),
};
