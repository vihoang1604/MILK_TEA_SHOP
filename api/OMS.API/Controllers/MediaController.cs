using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OMS.API.Core.Common.Constants;
using OMS.API.Core.Common.Helpers;
using System.IO;
using System.Threading.Tasks;

namespace OMS.API.Controllers
{
    [Route("api/media")]
    [EnableCors("CorsPolicy")]
    public class MediaController : Controller
    {
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(string folder, string fileName, IFormFile file)
        {
            var task = Task.Run(() => FileHelper.SaveFile(folder, fileName, file));

            await Task.WhenAll(task);

            return Ok(Url.Action("GetFile", "Media", new { folder, fileName = string.Format(fileName) }, Request.Scheme));
        }

        [HttpPost("uploads")]
        public async Task<IActionResult> UploadFiles(string folder, string[] filenames, IFormFile[] files)
        {
            if (files == null || files.Length <= 0)
            {
                return NotFound(MessageConstants.FILE_REQUIRED);
            }
            else
            {
                var result = string.Empty;

                int i = 0;

                foreach (var file in files)
                {
                    var fileName = filenames[i];

                    var task = Task.Run(() => FileHelper.SaveFile(folder, fileName, file));

                    await Task.WhenAll(task);

                    var link = Url.Action("GetFile", "Media", new { folder, fileName = string.Format(fileName) }, Request.Scheme);

                    result = string.Concat(result, "|", link);
                    i++;
                }
                return Ok(result.TrimStart('|'));
            }
        }

        [HttpGet("{folder}/{fileName}")]
        public async Task<IActionResult> GetFile(string folder, string fileName)
        {
            var task = Task.Run(() => FileHelper.GetFile(folder, fileName));

            await Task.WhenAll(task);

            var fileStream = System.IO.File.OpenRead(task.Result);

            string contentType = GetMimeType(fileName);

            return base.File(fileStream, contentType);
        }

        private string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = Path.GetExtension(fileName).ToLower();
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null)
                mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }
    }
}
