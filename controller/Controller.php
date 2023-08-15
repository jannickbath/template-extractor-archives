<?php

namespace Lupcom\{bundle_name}\Controller;

use Contao\ContentModel;
use Contao\CoreBundle\Controller\ContentElement\AbstractContentElementController;
use Contao\CoreBundle\ServiceAnnotation\ContentElement;
use Contao\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Lupcom\{bundle_name}\Classes\Helper;

/**
 * @ContentElement({controller_name}::TYPE, category="lupcom", template={template_name}::TYPE)
 */
class {controller_name} extends AbstractContentElementController
{
    public const TYPE = '{template_name}';

    /**
     * Generate the content element
     */
    protected function getResponse(Template $template, ContentModel $model, Request $request): ?Response
    {
        if (TL_MODE == "BE") {
            return Helper::genBeTemplate("Lorem ipsum dolor", "## {controller_name} ##");
        }

        return $template->getResponse();
    }
}
