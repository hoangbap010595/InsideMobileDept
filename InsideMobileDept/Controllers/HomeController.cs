using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InsideMobileDept.Security;

namespace InsideMobileDept.Controllers
{
    [HandleError()]
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.Action = "Trang chủ";
            return View();
        }


        [CustomAuthorize(Roles = "Administrators,Users")]
        public ActionResult GetData()
        {
            ViewBag.Action = "GetData";
            return View();
        }

        public ActionResult GAdmin()
        {
            ViewBag.Action = "GAdmin";
            return View();
        }
    }
}