using Microsoft.EntityFrameworkCore;

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
