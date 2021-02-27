using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ULA_App.Models
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }

        [Required]
        public string BookName { get; set; }

        public string Author { get; set; }

        public string BookCategory { get; set; }

        [Required]
        public int NumberOfCopies { get; set; }

        public DateTime DateTimeOfCreation { get; set; }
    }
}
