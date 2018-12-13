﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tetris.Models.Common
{
    public class AuthInfoModel
    {
        public bool IsAuth { get; set; }
        public string Login { get; set; }
        public string FullName { get; set; }
        public List<string> Roles { get; set; }
    }
}