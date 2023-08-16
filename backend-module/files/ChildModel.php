<?php

namespace Lupcom\{bundle_name}\Models;

use Contao\Model;

class [model_name] extends Model
{
    /**
     * Table name
     * @var string
     */
    protected static $strTable = '{child_table_name}';

    public static function findByAlias(string $alias, array $arrOptions = [])
    {
        $t = static::$strTable;

        return static::findBy(["$t.alias=?"], [$alias], $arrOptions);
    }

    public static function findByPid(int $pid, array $arrOptions = [])
    {
        $t = static::$strTable;

        return static::findBy(["$t.pid=?"], [$pid], $arrOptions);
    }
}
