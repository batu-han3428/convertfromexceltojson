using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConvertController : ControllerBase
    {
        [HttpPost("ConvertToJson")]
        public IActionResult ConvertToJson(object veri)
        {

            string veri1 = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(veri.ToString()));

            System.IO.File.WriteAllText(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosya.json", veri1);

            return Ok();
        }
    }
}
