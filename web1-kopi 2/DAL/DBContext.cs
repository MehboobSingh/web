using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace Gruppeoppgave1.DAL
{

    public class Billeter
    {
       

        [Key]
        public int BId { get; set; }

        public string Fra { get; set; }
        public string Til { get; set; }
        public string Type { get; set; }
        public double Price { get; set; }

        public string DateFra { get; set; }
        public string DateRetur { get; set; }

        public virtual List<Strekninger> Strekning { get; set; }





        public int StrekningId { get; set; }
         //public virtual Strekninger Strekninger { get; set; }

    }


    public class Strekninger

    {
        

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int SId { get; set; }
        public string Fra { get; set; }
        public string Til { get; set; }
        public int StrekningId { get; set; }


    }



    public class DBContext : DbContext
    {
        public DBContext()
        {
        }

        public DBContext(DbContextOptions<DBContext> options) : base(options)

        {
           
            Database.EnsureCreated();


           
        }


        public virtual DbSet<Billeter> Billeter { get; set; }
        public virtual DbSet<Strekninger> Strekninger { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}


