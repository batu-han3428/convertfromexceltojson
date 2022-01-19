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

            string veri2 = "";

            string veri1 = JsonConvert.SerializeObject(JsonConvert.DeserializeObject(veri.ToString()));

            if (System.IO.File.Exists(@"C:\Users\batu_\Desktop\Excel.json"))
            {
                veri2 = System.IO.File.ReadAllText(@"C:\Users\batu_\Desktop\Excel.json");
            }

            System.IO.File.WriteAllText(@"C:\Users\batu_\Desktop\Excel.json", veri2+"-"+veri1);

            return Ok(veri1);
        }
    }
}
