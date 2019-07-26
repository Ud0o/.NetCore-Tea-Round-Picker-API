using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeaRound.Models
{
    public class RoundContext : DbContext
    {
        public RoundContext(DbContextOptions<RoundContext> contextOptions) : base(contextOptions)
        {
        }
        public DbSet<Player> Players{ get; set; }
    }
}
