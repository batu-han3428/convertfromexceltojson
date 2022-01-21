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

            if (System.IO.File.Exists(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosyalar\dosya.json"))
            {
                veri2 = System.IO.File.ReadAllText(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosyalar\dosya.json") + "-";
            }

            System.IO.File.WriteAllText(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosyalar\dosya.json", veri2 + veri1);

            return Ok(veri1);
        }


        [HttpGet("DownloadJson")]
        public IActionResult DownloadJson()
        {

            string veri = "";

            if (System.IO.File.Exists(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosyalar\dosya.json"))
            {
                veri = System.IO.File.ReadAllText(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosyalar\dosya.json");
            }


            return Ok(veri);
        }


        [HttpPost("LoginControl")]
        public IActionResult LoginControl(User user)
        {
            if (user.mail == "" || user.password == "")
            {
                return NotFound();
            }
            else
            {

                string veri = System.IO.File.ReadAllText(@"C:\Users\bfindik.EKOFACTORING\Desktop\dosyalar\users.json");

                List<User> users = JsonConvert.DeserializeObject<List<User>>(veri);

                foreach (var User in users)
                {
                    if (User.mail == user.mail)
                    {
                        if (User.password == user.password)
                        {
                            return Ok();
                        }
                    }
                }

                return Unauthorized();
            }
        }
    }
}
