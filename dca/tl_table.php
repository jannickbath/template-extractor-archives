<?php

use Contao\Config;

$strName = "{table_name}";

// Fields
$GLOBALS["TL_DCA"][$strName]["fields"]["linktext"] = [
    "exclude" => false,
    "inputType" => "text",
    "eval" => ["tl_class" => "w50", "maxlength" => 255],
    "sql" => "varchar(255) NOT NULL default ''"
];

$GLOBALS["TL_DCA"][$strName]["fields"]["list"] = [
    "exclude" => false,
    "inputType" => "listWizard",
    "eval" => ["tl_class" => "w50", "maxlength" => 255],
    "sql" => "blob NULL"
];

$GLOBALS["TL_DCA"][$strName]["fields"]["subline"] = [
    "exclude" => false,
    "inputType" => "text",
    "eval" => ["tl_class" => "w50", "maxlength" => 255],
    "sql" => "varchar(255) NOT NULL default ''"
];

$GLOBALS["TL_DCA"][$strName]["fields"]["newTab"] = [
    'exclude'                 => true,
    'inputType'               => 'checkbox',
    'eval'                    => array('tl_class' => 'w50'),
    'sql'                     => "char(1) NOT NULL default ''"
];

$GLOBALS['TL_DCA'][$strName]['fields']['multiSRC_uploader'] =  array(
    'search' => true,
    'inputType' => 'fineUploader',
    'eval' => array(
        'mandatory' => false,
        'storeFile' => true, // Mandatory to store the file on the server
        'multiple' => true, // Allow multiple files to be uploaded
        'uploadFolder' => 'files/images', // Upload path (destination folder)
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
);

$GLOBALS['TL_DCA'][$strName]['fields']['linktarget'] = array(
    'label' => &$GLOBALS['TL_LANG']['MSC']['url'],
    'exclude' => true,
    'search' => true,
    'inputType' => 'text',
    'eval' => array(
        'mandatory' => false,
        'rgxp' => 'url',
        'decodeEntities' => true,
        'maxlength' => 255,
        'dcaPicker' => true,
        'tl_class' => 'w50 wizard'
    ),
    'sql' => "varchar(255) NOT NULL default ''"
);

$GLOBALS['TL_DCA'][$strName]['fields']['description'] = array(
    "exclude" => false,
    "inputType" => "text",
    'eval' => array('mandatory' => true, 'rte' => 'tinyMCE', 'tl_class' => 'clr'),
    "sql" => "TEXT NULL"
);

// //Palettes
// $GLOBALS['TL_DCA'][$strName]['palettes'][ContentElementText::TYPE]     = '
//     {type_legend},type;
//     {headline_legend},headline,subline;
//     {description_legend},text;
//     {expert_legend:hide},cssID;
//     {invisible_legend:hide},invisible,start,stop;';