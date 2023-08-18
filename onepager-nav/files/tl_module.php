// Fields
$GLOBALS['TL_DCA'][$strName]['fields']['articleOptions'] = array(
    'inputType' => 'checkbox',
    'options_callback' => "generateArticleOptions",
    'eval' => ['multiple' => true],
    'sql' => "blob NULL",
);

$GLOBALS['TL_DCA'][$strName]['palettes'][{module_name}::TYPE]     = '
    {type_legend},type,name;
    {nav_legend},articleOptions;
    {expert_legend:hide},cssID;
    {invisible_legend:hide},invisible,start,stop;';

function generateArticleOptions(): array
{
    $options = [];
    $pages = PageModel::findByPublished(1);

    foreach ($pages ?? [] as $page) {
        if ($page->published) {
            $options[$page->title] = getArticleTitles($page->id);
        }
    }

    return $options;
}

function getArticleTitles($pageId)
{
    $articleTitles = [];
    $articles = ArticleModel::findByPid($pageId);

    $articleTitles["index-$pageId"] = "Index";
    if ($articles) {
        foreach ($articles as $article) {
            $articleTitles[$article->id] = $article->title;
        }
    }

    return $articleTitles;
}