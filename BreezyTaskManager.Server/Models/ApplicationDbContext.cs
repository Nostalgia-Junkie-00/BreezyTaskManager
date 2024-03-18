using Microsoft.EntityFrameworkCore;

namespace BreezyTaskManager.Server.Models
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
