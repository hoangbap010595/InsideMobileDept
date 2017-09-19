use master
go
if exists (select name from sys.databases where name = 'MobileStore')
	 drop database [MobileStore]
go
create database [MobileStore]
go
use [MobileStore]
go
--==================================================================
--AspNet Auth 2017
--//Create Table Authentication
CREATE TABLE [dbo].[Roles] (
    [Id]   NVARCHAR (128) NOT NULL,
    [Name] NVARCHAR (256) NOT NULL,
    CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
CREATE TABLE [dbo].[Users] (
    [Id]                   INT IDENTITY(1,1) NOT NULL,
	[UserName]				NVARCHAR (256) NOT NULL,
	[FullName]             NVARCHAR (256) NULL,
    [Email]                NVARCHAR (256) NULL,
    [EmailConfirmed]       BIT             Default 0,
    [PasswordHash]         NVARCHAR (MAX) NULL,
    [SecurityStamp]        NVARCHAR (MAX) NULL,
    [PhoneNumber]          NVARCHAR (MAX) NULL,
    [PhoneNumberConfirmed] BIT            NOT NULL,
    [Enabled]				BIT	   Default 1,
    [DateCreate]			DATETIME       NULL,
    [Status]       BIT	   Default 1,
    [AccessFailedCount]    INT             NULL,  
    CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex]
    ON [dbo].[Users]([UserName] ASC);

GO
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex]
    ON [dbo].[Roles]([Name] ASC);
GO
CREATE TABLE [dbo].[UserClaims] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [UserId]     INT NOT NULL,
    [ClaimType]  NVARCHAR (MAX) NULL,
    [ClaimValue] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_dbo.UserClaims] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.UserClaims_dbo.Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_UserId]
    ON [dbo].[UserClaims]([UserId] ASC);

GO
CREATE TABLE [dbo].[UserLogins] (
    [LoginProvider] NVARCHAR (128) NOT NULL,
    [ProviderKey]   NVARCHAR (128) NOT NULL,
    [UserId]        INT NOT NULL,
    CONSTRAINT [PK_dbo.UserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC, [ProviderKey] ASC, [UserId] ASC),
    CONSTRAINT [FK_dbo.UserLogins_dbo.Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_UserId]
    ON [dbo].[UserLogins]([UserId] ASC);

GO
CREATE TABLE [dbo].[UserRoles] (
    [UserId] INT NOT NULL,
    [RoleId] NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_dbo.UserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC),
    CONSTRAINT [FK_dbo.UserRoles_dbo.Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo.UserRoles_dbo.Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_UserId]
    ON [dbo].[UserRoles]([UserId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RoleId]
    ON [dbo].[UserRoles]([RoleId] ASC);

--//End Table Authentication
--====================================================
--Create Table

CREATE TABLE [dbo].[Object] (
    [ObjectId] INT IDENTITY(1,2) NOT NULL,
	[Name]         NVARCHAR (256) NULL,
	[FullName]     NVARCHAR (256) NULL,
	[Address]      NVARCHAR (256) NULL,
    [Passport]     NVARCHAR (256) NULL,
	[DateOfBirth]  DATETIME       NULL,
	[Job]          NVARCHAR (256) NULL,
	[Email]        NVARCHAR (256) NULL,
    [PhoneNumber]  NVARCHAR (256) NULL,
    [Gender]	   BIT            NULL,
	[Note]         NVARCHAR (MAX) NULL,
	[ICPerMonth]   DECIMAL	DEFAULT 0 ,
    CONSTRAINT [PK_dbo.Object] PRIMARY KEY CLUSTERED ([ObjectId] ASC)
)
CREATE TABLE [dbo].[ObjectRef] (
    [Id] INT IDENTITY(1,1) NOT NULL,
	[ObjectId]		INT NOT NULL,
	[FullName]     NVARCHAR (256) NULL,
    [PhoneNumber]  NVARCHAR (256) NULL,
    CONSTRAINT [PK_dbo.ObjectRef] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_dbo.Object_dbo.ObjectRef_ObjectId] FOREIGN KEY ([ObjectId]) REFERENCES [dbo].[Object] ([ObjectId]) ON DELETE CASCADE
)

CREATE TABLE [dbo].[Product] (
    [Model]			NVARCHAR (128) NOT NULL,
	[Description]         NVARCHAR (256) NULL,
	[Price]   DECIMAL	DEFAULT 0 ,
    CONSTRAINT [PK_dbo.Product] PRIMARY KEY CLUSTERED ([Model] ASC)
)

CREATE TABLE [dbo].[SubDept] (
    [DeptId] INT IDENTITY(1,1) NOT NULL,
	[DatePayment]  DATETIME       NULL,
	[TotalPayment]   DECIMAL	DEFAULT 0 ,
	[Paid]   DECIMAL	DEFAULT 0 ,
	[NotPaid]   DECIMAL	DEFAULT 0 ,
	[PricePayMonth]   DECIMAL	DEFAULT 0 ,
	[MonthNeedPayment] INT,
	[Description]         NVARCHAR (256) NULL,
	[SaleID]         NVARCHAR (256) NULL,
	[TypeId] INT,
	[StatusId] INT,
	[ObjectId] INT,
    CONSTRAINT [PK_dbo.SubDept] PRIMARY KEY CLUSTERED ([DeptId] ASC)
)


CREATE TABLE [dbo].[PaymentType] (
    [Id]			INT IDENTITY(5,10) NOT NULL,
	[Name]			NVARCHAR (256)       NULL,
	[Description]   NVARCHAR (256) NULL,
	[Type]			INT NULL,
	[Enable]		BIT NULL
    CONSTRAINT [PK_dbo.PaymentType] PRIMARY KEY CLUSTERED ([Id] ASC)
)
CREATE TABLE [dbo].[PaymentStatus] (
    [Id]			INT IDENTITY(2,2) NOT NULL,
	[Name]			NVARCHAR (256)       NULL,
	[Description]   NVARCHAR (256) NULL,
	[Type]			INT NULL,
	[Enable]		BIT NULL
    CONSTRAINT [PK_dbo.PaymentStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[ProductDept] (
    [Id]			INT IDENTITY(1,1) NOT NULL,
	[DeptId]		INT NOT NULL,
	[Model]			NVARCHAR (128) NOT NULL
    CONSTRAINT [PK_dbo.ProductDept] PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[Log] (
    [Id]			INT IDENTITY(1,1) NOT NULL,
	[Action]		NVARCHAR (256) NULL,
	[Description]	NVARCHAR (MAX) NULL,
	[Date]			DATETIME       NULL,
    CONSTRAINT [PK_dbo.Log] PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[HistoryPayment] (
    [Id]			INT IDENTITY(3,3) NOT NULL,
	[DeptId]		INT NULL,	
	[DatePayment]   DATETIME       NULL,
	[PricePayment]  DECIMAL	DEFAULT 0 ,
	[Description]	NVARCHAR (MAX) NULL,
	[Note]			NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_dbo.HistoryPayment] PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[Menu] (
    [Id]			INT IDENTITY(1,10) NOT NULL,
	[Name]			NVARCHAR (256)       NULL,
	[Description]   NVARCHAR (256) NULL,
	[Path]			NVARCHAR (256) NULL,
    CONSTRAINT [PK_dbo.Menu] PRIMARY KEY CLUSTERED ([Id] ASC)
)
CREATE TABLE [dbo].[SubMenu] (
    [Id]			INT IDENTITY(1,10) NOT NULL,
	[MenuLevel]		INT,
	[Name]			NVARCHAR (256)       NULL,
	[Description]   NVARCHAR (256) NULL,
	[Path]			NVARCHAR (256) NULL,
    CONSTRAINT [PK_dbo.SubMenu] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO
Insert into  [dbo].[Menu]([Name],[Description],[Path])
values('Menu Product',N'Quản trị sản phẩm','')
	,('Menu Dept',N'Quản trị công nợ','')
	,('Menu Report',N'Báo cáo','')
	,('Menu System',N'Hệ thống','')
	,('Menu History',N'Lịch sử giao dịch','')
	,('Menu Setting',N'Cài đặt','')
go
Insert into  [dbo].[SubMenu]([MenuLevel],[Name],[Description],[Path])
values(1,'Menu Product',N'Thêm mới','')
	,(1,'Menu Product',N'Cập nhật','')
	,(1,'Menu Product',N'Danh sách','')
	,(11,'Menu Dept',N'Tạo phiếu','')
	,(11,'Menu Dept',N'Cập nhật phiếu','')
	,(11,'Menu Dept',N'Thanh toán','')
	,(21,'Menu Report',N'Báo cáo công nợ','')
	,(21,'Menu Report',N'Báo cáo doanh thu','')
	,(21,'Menu Report',N'Báo cáo tổng tiền cần thu','')
	,(21,'Menu Report',N'Báo cáo tổng tiền trễ hẹn ','')
go
Insert into [dbo].[PaymentType]([Name],[Description],[Type],[Enable])
values ('TG',N'Trả góp',1, 1)
	,('TO',N'Trả 1 lần',1, 1)
	,('TS',N'Trả sau',1, 1)
	,('TT',N'Trả trước',1, 1)
GO
Insert into [dbo].[PaymentStatus]([Name],[Description],[Type],[Enable])
values ('NOT Payment',N'Chưa thanh toán',1, 1)
	,('Keep Payment',N'Đang thanh toán',1, 1)
	,('OK Payment',N'Đã thanh toán',1, 1)
	,('STOP Payment',N'Hủy thanh toán',1, 1)

GO
Insert into [dbo].[Roles]
values ('111', 'Administrators')
	,('222', 'Users')
	,('333', 'Guests')