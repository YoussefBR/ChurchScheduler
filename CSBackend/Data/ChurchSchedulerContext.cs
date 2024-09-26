using CSBackend.Models;
using Microsoft.EntityFrameworkCore;

public class ChurchSchedulerContext : DbContext
{
    public ChurchSchedulerContext(DbContextOptions<ChurchSchedulerContext> options) : base(options)
    {
    }
    public DbSet<Abouna> Abounas { get; set; } // Example DbSet
    //public DbSet<Attending> Attendings { get; set; } // Example DbSet
    public DbSet<Meeting> Meetings { get; set; } // Example DbSet
    //public DbSet<TimeSlot> TimeSlots { get; set; } // Example DbSet
    //public DbSet<User> Users { get; set; } // Example DbSet
    //public DbSet<AbounaMeeting> AbounaMeetings { get; set; } // Join table for Abouna and Meeting
    //public DbSet<UserMeeting> UserMeetings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=127.0.0.1;Port=5432;Username=nardineshak;Password=narrr2202$!;Database=cap_db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Meeting>()
            .Property(m => m.StartTime)
            .HasColumnType("timestamp with time zone");
        
        modelBuilder.Entity<Meeting>()
            .Property(m => m.EndTime)
            .HasColumnType("timestamp with time zone");

        // modelBuilder.Entity<Meeting>()
        //     .Property(m => m.DayOfMeeting)
        //     .HasColumnName("DayOfMeeting"); 

        // modelBuilder.Entity<AbounaMeeting>()
        //         .HasKey(am => new { am.AbounaId, am.MeetingId });

        // modelBuilder.Entity<AbounaMeeting>()
        //         .HasOne(am => am.Abouna)
        //         .WithMany(a => a.AbounaMeetings)
        //         .HasForeignKey(am => am.AbounaId);

        // modelBuilder.Entity<AbounaMeeting>()
        //     .HasOne(am => am.Meeting)
        //     .WithMany(m => m.AbounaMeetings)
        //     .HasForeignKey(am => am.MeetingId);

        // Many-to-many relationship between User and Meeting
        // modelBuilder.Entity<UserMeeting>()
        //     .HasKey(um => new { um.UserId, um.MeetingId }); // Composite key

        // modelBuilder.Entity<UserMeeting>()
        //     .HasOne(um => um.User)
        //     .WithMany(u => u.UserMeetings)
        //     .HasForeignKey(um => um.UserId);

        // modelBuilder.Entity<UserMeeting>()
        //     .HasOne(um => um.Meeting)
        //     .WithMany(m => m.UserMeetings)
        //     .HasForeignKey(um => um.MeetingId);

        // Configure one-to-one relationship between Meeting and Timeslot
        // modelBuilder.Entity<Meeting>()
        //     .HasOne(m => m.TimeSlot)  // Meeting has one Timeslot
        //     .WithOne(t => t.Meeting)  // Timeslot has one Meeting
        //     .HasForeignKey<Meeting>(m => m.TimeSlotId);  // Foreign key in Meeting table
    }
}
