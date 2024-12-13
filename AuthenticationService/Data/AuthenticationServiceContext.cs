using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AuthenticationService.Models;

namespace AuthenticationService.Data
{
    public class AuthenticationServiceContext : DbContext
    {
        public AuthenticationServiceContext (DbContextOptions<AuthenticationServiceContext> options)
            : base(options)
        {
        }

        public DbSet<AuthenticationService.Models.User> User { get; set; } = default!;
    }
}
