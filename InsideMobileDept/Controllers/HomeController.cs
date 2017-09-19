using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InsideMobileDept.Security;

namespace InsideMobileDept.Controllers
{

    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewData["Action"] = "Trang chủ";
            return View();
        }


        [CustomAuthorize(Roles = "system,admin")]
        public ActionResult GetData()
        {
            return View();
        }
    }
}