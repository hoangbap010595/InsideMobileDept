using PartialView.Areas.PartialView.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace InsideMobileDept.Models
{
    public class AccountModel
    {
        string strCon = ConfigurationManager.ConnectionStrings[ConnectionDatabase.strSqlConetion].ConnectionString;
        private List<Account> listAccounts = new List<Account>();

        public AccountModel()
        {
            SqlParameter[] para = new SqlParameter[]
            {
                new SqlParameter("@Username", ""),
                new SqlParameter("@Password", "" ),
                new SqlParameter("@Type", 2),
            };
            DataSet ds = v1SqlHelper.ExecuteDataset(strCon, "[dbo].[checkLoginUser]", para);
            listAccounts = GetTableRows(ds.Tables[0]);
        }

        public Account find(string username)
        {
            return listAccounts.Where(x => x.Username.Equals(username)).FirstOrDefault();
        }

        public List<Account> GetTableRows(DataTable dt)
        {
            List<Account> listData = new List<Account>();
            Account rowData;

            foreach (DataRow dr in dt.Rows)
            {
                rowData = new Account();
                foreach (DataColumn col in dt.Columns)
                {
                    rowData.Username = dr["Username"].ToString().ToUpper();
                    rowData.FullName = dr["FullName"].ToString();
                    rowData.Role = dr["Role"].ToString().Split(',');
                }
                listData.Add(rowData);
            }

            return listData;
        }
    }
}