<?php

namespace BaksDev\Search\RediSearch\Fields;

class Tag
{
    protected $value;

    public function __construct($value)
    {
        $this->value = $value;
    }

    public function __toString()
    {
        return $this->value;
    }
}
