<?php

use Contao\Config;

/**
 * Table {child_table_name}
 */
$strTable = "{child_table_name}";

$GLOBALS['TL_DCA'][$strTable] = array(
    'config' => array(
        'dataContainer' => Contao\DC_Table::class,
        "ptable" => "{parent_table_name}",
        'enableVersioning' => 'true',
        'sql'                => array(
            'keys'        => array(
                'id'        => 'primary',
                'pid'        => "index"
            )
        ),
    ),
    'list' => [
        'sorting'        => array(
            'mode'        => 4,
            'fields'    => array('sorting'),
            'flag'        => 1,
            'headerFields' => array('name'),
            'panelLayout'    => 'filter;search,limit',
            'child_record_callback' => [$strTable, "generateChilds"]
        ),
        'label'        => array(
            'fields'    => array('name'),
            'format'    => '%s',
        ),
        'global_operations'        => array(
            'all'        => array(
                'label'        => &$GLOBALS['TL_LANG']['MSC']['all'],
                'href'        => 'act=select',
                'class'     => 'header_edit_all',
                'attributes'    => 'onclick="Backend.getScrollOffset()" accesskey="e"'
            )
        ),
        'operations'        => array(
            'edit'        => array(
                'label'    => &$GLOBALS['TL_LANG']['tl_content']['edit'],
                'href'    => 'act=edit',
                'icon'    => 'edit.gif',
            ),
            "copy" => [
                'href'                => 'act=copy',
                'icon'                => 'copy.svg',
                'button_callback'     => array('{child_table_name}', 'copyItem')
            ],
            'delete'        => array(
                'label'    => &$GLOBALS['TL_LANG']['tl_content']['delete'],
                'href'    => 'act=delete',
                'icon'    => 'delete.gif',
                'attributes'    => 'onclick="if(!confirm(\'' . $GLOBALS['TL_LANG']['MSC']['deleteConfirm'] . '\'))return false;Backend.getScrollOffset()"'
            ),
            'toggle' => array(
                'icon'                => 'visible.svg',
                'attributes'          => 'onclick="Backend.getScrollOffset()"',
                'button_callback'     => array('{child_table_name}', 'toggleIcon')
            ),
            'show'        => array(
                'label'    => &$GLOBALS['TL_LANG']['tl_content']['show'],
                'href'    => 'act=show',
                'icon'    => 'show.gif',
                'attributes'    => 'style="margin: 0 3px;"'
            ),
        )
    ],
    'palettes' => [
        '__selector__' => [],
        'default' => "
            {name_legend},name,alias;
            {description_legend},description;
            {publish_legend},published;"
    ],
    'fields' => [
        'id' => ['sql' => "int(10) unsigned NOT NULL auto_increment"],
        'pid' => ['sql' => "int(10) unsigned NOT NULL default '0'"],
        'sorting' => ['sql' => "int(10) unsigned NOT NULL default '0'"],
        'tstamp' => ['sql' => "int(10) unsigned NOT NULL default '0'"],
        'published' => array(
            'label' => &$GLOBALS['TL_LANG'][$strTable]['published'],
            'filter' => true,
            'flag' => 2,
            'inputType' => 'checkbox',
            'eval' => array('doNotCopy' => true, 'tl_class' => 'w50'),
            'sql' => "char(1) NOT NULL default 0"
        ),
        'name' => [
            'label' => &$GLOBALS['TL_LANG'][$strTable]['name'],
            'search' => true,
            'inputType' => 'text',
            'eval' => ['maxlength' => 200, 'allowHtml' => false, 'tl_class' => 'w50'],
            'sql' => "varchar(255) NOT NULL default ''"
        ],
        'alias' => [
            'search' => true,
            'inputType' => 'text',
            'eval' => ['maxlength' => 200, 'allowHtml' => false, 'tl_class' => 'w50'],
            'sql' => "varchar(255) NOT NULL default ''"
        ],
        'singleSRC' => [
            'exclude' => true,
            'inputType' => 'fileTree',
            'eval' => array('filesOnly' => true, 'extensions' => Config::get("validImageTypes"), 'fieldType' => 'radio', 'mandatory' => false, 'tl_class' => 'w33'),
            'sql' => "binary(16) NULL",
        ],
        'multiSRC_uploader' =>  array(
            'search' => true,
            'inputType' => 'fineUploader',
            'eval' => array(
                'mandatory' => false,
                'storeFile' => true, // Mandatory to store the file on the server
                'multiple' => true, // Allow multiple files to be uploaded
                'uploadFolder' => 'files/bilder/restaurants', // Upload path (destination folder)
                'uploaderConfig' => 'debug: false', // Custom uploader configuration (JSON)
                'uploaderLimit' => 0, // Maximum files that can be uploaded
                'addToDbafs' => true, // Add files to the database assisted file system
                'extensions' => "jpeg,jpg,png,svg,gif", // Allowed extension types
                'maxlength' => 1024000, // Maximum file size
                'doNotOverwrite' => false, // Do not overwrite files in destination folder
                'chunking' => true, // Enable chunking
                'chunkSize' => 1000000, // Chunk size in bytes
                'tl_class' => 'clr',
                'fieldType' => 'checkbox',
                'filesOnly' => true,
            ),
            'sql' => "blob NULL"
        ),
        "description" => [
            "exclude" => false,
            "inputType" => "text",
            'eval' => array('mandatory' => true, 'rte' => 'tinyMCE', 'tl_class' => 'clr'),
            "sql" => "TEXT NULL"
        ],
    ]
);

/**
 * Class {child_table_name}
 *
 * Provide miscellaneous methods that are used by the data configuration array.
 * @package Controller
 */
class {child_table_name} extends \Contao\Backend
{
    private static $strName = "{child_table_name}";

    /**
     * Return the copy category button
     *
     * @param array  $row
     * @param string $href
     * @param string $label
     * @param string $title
     * @param string $icon
     * @param string $attributes
     *
     * @return string
     */
    public function copyItem($row, $href, $label, $title, $icon, $attributes)
    {
        return '<a href="' . $this->addToUrl($href . '&amp;id=' . $row['id']) . '" name="' . Contao\StringUtil::specialchars($title) . '"' . $attributes . '>' . Contao\Image::getHtml($icon, $label) . '</a> ';
    }

    /**
     * Return the "toggle visibility" button
     *
     * @param array  $row
     * @param string $href
     * @param string $label
     * @param string $title
     * @param string $icon
     * @param string $attributes
     *
     * @return string
     */
    public function toggleIcon($row, $href, $label, $name, $icon, $attributes)
    {
        // Read GET-Parameters
        $tid = \Contao\Input::get("tid");
        $state = \Contao\Input::get("state");

        if (strlen($tid) && strlen($state)) {
            $this->updateVisibility($tid, $state);
            $this->redirect($this->getReferer()); //--> navigate back to overview
        }

        if (!$row['published']) {
            $icon = 'invisible.svg';
        }

        // Set GET-Parameters
        $href .= '&amp;tid=' . $row['id'] . '&amp;state=' . $row['published'];

        $href = $this->addToUrl($href);
        $image = \Contao\Image::getHtml($icon, $label);
        $name = \Contao\StringUtil::specialchars($name);

        return "<a href='{$href}' $attributes name='{$name}'>$image</a>";
    }

    public function updateVisibility(int $intId, bool $blnVisible)
    {
        $time = time();
        $blnVisible = $blnVisible ? 0 : 1;

        $this->Database->prepare("UPDATE {$this::$strName} SET tstamp=?, published=? WHERE id=?")
            ->execute([$time, $blnVisible, $intId]);
    }

    public function generateChilds(array $recordData)
    {
        return "<span>{$recordData['name']}</span>";
    }
}
