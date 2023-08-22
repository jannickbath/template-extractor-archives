<?php

namespace Lupcom\{bundle_name}\Modules;

use Contao\CoreBundle\Controller\FrontendModule\AbstractFrontendModuleController;
use Contao\CoreBundle\ServiceAnnotation\FrontendModule;
use Contao\ModuleModel;
use Contao\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Lupcom\{bundle_name}\Classes\Helper;

/**
 * @FrontendModule({module_name}::TYPE, category="lupcom", template={module_name}::TYPE)
 */
class {module_name} extends AbstractFrontendModuleController
{
    public const TYPE = "{template_name}";

    protected function getResponse(Template $template, ModuleModel $model, Request $request): Response
    {
        if (TL_MODE == "BE") {
            return Helper::genBeTemplate("{module_name}", "## {module_name} ##");
        }
        return $template->getResponse();
    }
}
