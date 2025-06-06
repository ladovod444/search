<?php
/*
 *  Copyright 2025.  Baks.dev <admin@baks.dev>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is furnished
 *  to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

namespace BaksDev\Search\Type\SearchTags\Collection;

use BaksDev\Search\SearchIndex\SearchIndexTagInterface;
use Symfony\Component\DependencyInjection\Attribute\AutowireIterator;

/**
 * Определяет коллекцию тегов для поиска
 */
final class SearchIndexTagCollection
{
    private iterable $searchTags;

    public function __construct(
        #[AutowireIterator('baks.search-tags', defaultPriorityMethod: 'sort')] iterable $searchTags,
    ) {
        $this->searchTags = $searchTags;
    }

    /** Возвращает массив из значений SearchIndexTagInterface */
    public function cases(): array
    {
        foreach($this->searchTags as $key => $tag)
        {
            /** @var SearchIndexTagInterface $tag */
            $case[$key.$tag::sort()] = $tag;
        }

        ksort($case);

        return $case;
    }
}