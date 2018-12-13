using System;
using System.Web;
using System.Web.Mvc;

namespace Tetris.Infrastructure.Extensions
{
    public static class UrlHelperExtensions
    {
        public static string ContentVersioned(this UrlHelper self, string contentPath)
        {
            if (string.IsNullOrEmpty(contentPath))
                throw new ArgumentNullException();
            var fileName = HttpContext.Current.Server.MapPath(contentPath);
            var fileInfo = new System.IO.FileInfo(fileName);
            var versionedContentPath = contentPath + "?v=" + fileInfo.LastWriteTime.ToString("yyMMddHHmmSS");
            return self.Content(versionedContentPath);
        }
    }
}