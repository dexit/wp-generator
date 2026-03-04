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
import { cptCode, taxonomyCode } from './enhanced-snippets';

export const CodeBase = {
  mainPluginCode: (data) => mainPluginCode(data),
  assetsCode: (data, assets) => assetsCode(data, assets),
  composerCode: (data) => composerCode(data),
  installerCode: (data, tables) => installerCode(data, tables),
  functionsCode: (data, tables) => wpCrudFunctions(data, tables),
  dynamicMenuPageHandler: (data, table) => dynamicMenuPageHandler(data, table),
  adminCode: (data, tables) => adminCode(data, tables),
  listTableCode: (fileClassName, data, table) => listTableCode(fileClassName, data, table),
  adminViewCode: (viewType, data, table) => viewSnippet(viewType, data, table),
  apiCode: (data, restapis) => apiSnippetCode(data, restapis),
  frontendShortcode: (data) => shortcodeSnippet(data),
  frontendCode: (data) => frontendSnippet(data),
  menuCode: (data, tables, mainMenu) => menuSnippet(data, tables, mainMenu),
  formErrorCode: (data) => formErrorSnippet(data),
  gitIgnoreCode: () => gitIgnoreCode(),
  editorconfigCode: () => editorconfigCode(),
  phpcsCode: () => phpcsCode(),
  eslintignoreCode: () => eslintignoreCode(),
  eslintrcCode: () => eslintrcCode(),
  prettierrcCode: () => prettierrcCode(),
  readmeCode: (data) => readmeCode(data),
  postTypeRegistration: (data, postTypes) => cptCode(data, postTypes),
  taxonomyRegistration: (data, taxonomies) => taxonomyCode(data, taxonomies),
};
