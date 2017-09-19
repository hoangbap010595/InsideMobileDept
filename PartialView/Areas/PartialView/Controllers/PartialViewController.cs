using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PartialView.Areas.PartialView.Controllers
{
    public class PartialViewController: Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}