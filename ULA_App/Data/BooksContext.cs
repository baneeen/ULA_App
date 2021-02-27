using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ULA_App.Models;

namespace ULA_App.Data
{
    public class BooksContext : DbContext
    {
        public BooksContext (DbContextOptions<BooksContext> options)
            : base(options)
        {
        }

        public DbSet<ULA_App.Models.Book> Book { get; set; }
    }
}
