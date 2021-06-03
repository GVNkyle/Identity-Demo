using System;
using System.Linq;
using System.Threading.Tasks;
using Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName
            };
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("ForAdministrator")]
        public string GetForAdministrator()
        {
            return "Web method for Administrator";
        }

        [HttpGet]
        [Authorize(Roles = "Staff")]
        [Route("ForStaff")]
        public string GetStaff()
        {
            return "Web method for Staff";
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Staff")]
        [Route("ForAdministratorAndStaff")]
        public string GetForAdminOrStaff()
        {
            return "Web method for Administrator and Staff";
        }
    }
}