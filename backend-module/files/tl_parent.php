<?php

use Contao\Config;

/**
 * Table {parent_table_name}
 */
$strTable = "{parent_table_name}";

$GLOBALS['TL_DCA'][$strTable] = array(
    'config' => array(
        'dataContainer' => Contao\DC_Table::class,
        "ctable" => ["{child_table_name}"],
        'enableVersioning' => true,
        'sql'                => array(
            'keys'        => array(
                'id'        => 'primary'
            )
        ),
    ),
    'list' => [
        'sorting'        => array(
            'mode'        => 0,
            'fields'    => array('sorting'),
            'flag'        => 1,
            'headerFields' => array('name'),
            'panelLayout'    => 'filter;search,limit',
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
                'href'    => 'table={child_table_name}',
                'icon'    => 'edit.gif',
            ),
            'editheader' => array(
                'href'                => 'act=edit',
                'icon'                => 'header.svg',
                'button_callback'     => array('{parent_table_name}', 'editHeader')
            ),
            'copy' => array(
                'href'                => 'act=copy',
                'icon'                => 'copy.svg',
                'button_callback'     => array('{parent_table_name}', 'copyCategory')
            ),
            'delete'        => array(
                'label'    => &$GLOBALS['TL_LANG']['tl_content']['delete'],
                'href'    => 'act=delete',
                'icon'    => 'delete.gif',
                'attributes'    => 'onclick="if(!confirm(\'' . $GLOBALS['TL_LANG']['MSC']['deleteConfirm'] . '\'))return false;Backend.getScrollOffset()"'
            ),
            'show'        => array(
                'label'    => &$GLOBALS['TL_LANG']['tl_content']['show'],
                'href'    => 'act=show',
                'icon'    => 'show.gif',
                'attributes'    => 'style="margin-right: 3px;"'
            ),
        )
    ],
    'palettes' => [
        '__selector__' => [],
        'default' => "
            {description_legend},name;
            "
    ],
    'fields' => [
        'id'        => ['sql' => "int(10) unsigned NOT NULL auto_increment"],
        'sorting'   => ['sql' => "int(10) unsigned NOT NULL default '0'"],
        'tstamp'    => ['sql'    => "int(10) unsigned NOT NULL default '0'"],
        'published' => array(
            'label'       => &$GLOBALS['TL_LANG'][$strTable]['published'],
            'filter'      => true,
            'flag'        => 2,
            'inputType'   => 'checkbox',
            'eval'        => array('doNotCopy' => true, 'tl_class' => 'w50'),
            'sql'          => "char(1) NOT NULL default 0"
        ),
        'name'        => [
            'label' => &$GLOBALS['TL_LANG'][$strTable]['name'],
            'search' => true,
            'inputType' => 'text',
            'eval' => ['maxlength' => 200, 'allowHtml' => false, 'tl_class' => 'w50'],
            'sql' => "varchar(255) NOT NULL default ''"
        ]
    ]
);


/**
 * Class {parent_table_name}
 *
 * Provide miscellaneous methods that are used by the data configuration array.
 * @package Controller
 */
class {parent_table_name} extends \Contao\Backend
{
    /**
     * Return the edit header button
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
    public function editHeader($row, $href, $label, $title, $icon, $attributes)
    {
        return '<a href="' . $this->addToUrl($href . '&amp;id=' . $row['id']) . '" name="' . Contao\StringUtil::specialchars($title) . '"' . $attributes . '>' . Contao\Image::getHtml($icon, $label) . '</a> ';
    }

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
    public function copyCategory($row, $href, $label, $title, $icon, $attributes)
    {
        return '<a href="' . $this->addToUrl($href . '&amp;id=' . $row['id']) . '" name="' . Contao\StringUtil::specialchars($title) . '"' . $attributes . '>' . Contao\Image::getHtml($icon, $label) . '</a> ';
    }

    /**
     * Return the delete category button
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
    public function deleteCategory($row, $href, $label, $title, $icon, $attributes)
    {
        return '<a href="' . $this->addToUrl($href . '&amp;id=' . $row['id']) . '" name="' . Contao\StringUtil::specialchars($title) . '"' . $attributes . '>' . Contao\Image::getHtml($icon, $label) . '</a> ';
    }
}
