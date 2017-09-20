using InsideMobileDept.Models;
using InsideMobileDept.Security;
using PartialView.Areas.PartialView.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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

            SqlParameter[] para = new SqlParameter[]
            {
                new SqlParameter("@Username", am.Account.Username),
                new SqlParameter("@Password", v1HashMd5.getMD5_FromString(am.Account.Password) ),
                new SqlParameter("@Type", 1),
            };

            DataSet ds = v1SqlHelper.ExecuteDataset(strCon, "[dbo].[checkLoginUser]", para);

            if (ds.Tables[0].Rows.Count == 0)
            {
                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng");
                return View("Index");
            }
            else
            {
                try
                {
                    int status = bool.Parse(ds.Tables[0].Rows[0]["Status"].ToString()) == true ? 1 : 0;
                    string username = ds.Tables[0].Rows[0]["UserName"].ToString();
                    string fullname = ds.Tables[0].Rows[0]["FullName"].ToString();
                    string role = ds.Tables[0].Rows[0]["Role"].ToString();
                    #region check account
                    if (status == 0)
                    {
                        ModelState.AddModelError("", "Tài khoản không tồn tại");
                        return View("Index");
                    }
                    else if (status == 2)
                    {
                        ModelState.AddModelError("", "Tài khoản đang bị khóa");
                        return View("Index");
                    }
                    #endregion
                    SessionPersister.Username = username;
                    return RedirectToAction("Index", "Home");
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                    return View("Index");
                }
            }
        }

        public ActionResult Logout()
        {
            SessionPersister.Username = string.Empty;
            return RedirectToAction("Index", "Login");
        }

    }
}