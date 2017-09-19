using InsideMobileDept.Models;
using InsideMobileDept.Security;
using PartialView.Areas.PartialView.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InsideMobileDept.Controllers
{
    public class LoginController : Controller
    {
        string strCon = ConfigurationManager.ConnectionStrings[ConnectionDatabase.strSqlConetion].ConnectionString;
        // GET: Login
        public ActionResult Index()
        {
            //SessionPersister.Username = "sysadmin";
            if (!string.IsNullOrEmpty(SessionPersister.Username))
                return RedirectToAction("Index", "Home");
            SessionPersister.Username = string.Empty;
            return View();
        }

        [HttpPost]
        public ActionResult Login(AccountViewModel am)
        {
            List<Account> listAccount = new List<Account>();
            if (string.IsNullOrEmpty(am.Account.Username) || string.IsNullOrEmpty(am.Account.Password))
            {
                return View("Index");
            }

            string sql = "SELECT Username, Password FROM Account WHERE Username = '" + am.Account.Username +
                                                "' AND Password = '" + v1HashMd5.getMD5_FromString(am.Account.Password) + "'";
            DataSet ds= v1SqlHelper.ExecuteDataset(strCon, CommandType.Text, sql);

            if (ds.Tables[0].Rows.Count == 0)
            {
                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng");
                return View("Index");
            }

            SessionPersister.Username = am.Account.Username;
            return RedirectToAction("Index", "Home");

        }

        public ActionResult Logout()
        {
            SessionPersister.Username = string.Empty;
            return RedirectToAction("Index","Login");
        }

    }
}