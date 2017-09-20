using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace InsideMobileDept.Models
{
    public class Account
    {
        [Required(ErrorMessage = "Tên đăng nhập không được trống!")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được trống!")]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public int Status { get; set; }
        public string[] Role { get; set; }
    }
}