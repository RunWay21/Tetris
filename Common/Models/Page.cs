﻿using System;
using System.Collections.Generic;

namespace Common.Models
{
    public class Page<T>
    {
        public List<T> Items { get; set; }

        public int TotalPages { get; set; }

        public int TotalItems { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public Page(int currentPage, int pageSize, int totalItems, List<T> items)
        {
            CurrentPage = currentPage;
            TotalItems = totalItems;
            PageSize = pageSize;
            Items = items;

            TotalPages = pageSize != 0 ? (int)Math.Ceiling(TotalItems / (double)PageSize) : 0;
        }
    }
}
